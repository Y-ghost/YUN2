package com.rest.yun.service.Impl;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.rest.yun.beans.ControlHost;
import com.rest.yun.beans.Equipment;
import com.rest.yun.beans.EquipmentData;
import com.rest.yun.beans.EquipmentStatus;
import com.rest.yun.beans.SensorInfo;
import com.rest.yun.beans.SoilInfo;
import com.rest.yun.beans.User;
import com.rest.yun.constants.Constants;
import com.rest.yun.dto.EquipmentExt;
import com.rest.yun.dto.Page;
import com.rest.yun.exception.ErrorCode;
import com.rest.yun.exception.ServerException;
import com.rest.yun.mapping.ControlHostMapper;
import com.rest.yun.mapping.EquipmentDataMapper;
import com.rest.yun.mapping.EquipmentMapper;
import com.rest.yun.mapping.EquipmentStatusMapper;
import com.rest.yun.mapping.SensorInfoMapper;
import com.rest.yun.mapping.SoilInfoMapper;
import com.rest.yun.service.IEquipmentService;
import com.rest.yun.service.NetWorkService;
import com.rest.yun.util.CheckReceiveCodingUtil;
import com.rest.yun.util.CodingFactoryUtil;
import com.rest.yun.util.CommonUtiles;
import com.rest.yun.util.network.Client;

@Service
public class EquipmentServiceImpl implements IEquipmentService {
	private final static Logger LOG = LoggerFactory.getLogger(EquipmentServiceImpl.class);
	private CodingFactoryUtil codingFactory = new CodingFactoryUtil();
	private CheckReceiveCodingUtil checkCoding = new CheckReceiveCodingUtil();

	@Autowired
	private EquipmentMapper equipmentMapper;
	@Autowired
	private SensorInfoMapper sensorInfoMapper;
	@Autowired
	private EquipmentDataMapper equipmentDataMapper;
	@Autowired
	private EquipmentStatusMapper equipmentStatusMapper;
	@Autowired
	private ControlHostMapper controlHostMapper;
	@Autowired
	private SoilInfoMapper soilInfoMapper;
	@Autowired
	private NetWorkService netWorkService;

	/**
	 * @Title: selectEquipmentExt
	 * @author: 杨贵松
	 * @time 2014年11月6日 上午12:22:45
	 * @Description: 查询实时现场数据
	 */
	@Override
	public List<EquipmentExt<EquipmentData>> selectEquipmentExt(Integer pId) {
		List<EquipmentExt<EquipmentData>> list = new ArrayList<EquipmentExt<EquipmentData>>();
		try {
			List<Equipment> eList = equipmentMapper.selectByPid(pId);
			if (!CollectionUtils.isEmpty(eList)) {
				for (Equipment equipment : eList) {
					EquipmentExt<EquipmentData> equipmentExt = new EquipmentExt<EquipmentData>();
					EquipmentStatus equipmentStatus = equipmentStatusMapper.selectEquipmentStatusByeEid(equipment.getId());
					List<SensorInfo> sList = sensorInfoMapper.selectSensorInfoByEid(equipment.getId());
					List<EquipmentData> edList = new ArrayList<EquipmentData>();
					for (SensorInfo sensor : sList) {
						EquipmentData equipmentData = equipmentDataMapper.selectByPrimaryKey(sensor.getId());
						if (equipmentData == null) {
							equipmentData = new EquipmentData();
							equipmentData.setHumidity((float) 0);
							equipmentData.setSensorid(sensor.getId());
						}
						edList.add(equipmentData);
					}

					equipmentExt.setId(equipment.getId());
					equipmentExt.setName(equipment.getName());
					equipmentExt.setCode(equipment.getCode());
					equipmentExt.setControlHostId(equipment.getControlhostid());
					equipmentExt.setEquipmentStatus(equipmentStatus);
					equipmentExt.setEquipment(equipment);
					equipmentExt.setResult(edList);

					list.add(equipmentExt);
				}
			} else {
				LOG.warn("Equipment is null");
				throw new ServerException(ErrorCode.EQUIPMENT_LIST_NULL);
			}
		} catch (DataAccessException e) {
			LOG.error("查询实时现场数据异常", e);
			throw new ServerException(ErrorCode.SELECT_EQUIPMENT_LIST_FAILED);
		}
		return list;
	}

	/**
	 * @Title: openEquipments
	 * @author: 杨贵松
	 * @time 2014年11月6日 下午11:38:19
	 * @Description: 开启灌溉,id为多个节点id组装的字符串，以逗号分隔,如：1,2...
	 *               optionType为判断开启还是关闭操作，optionType=0表示开启，optionType=1表示关闭
	 */
	@Override
	public boolean openEquipments(Integer optionType, String id) {
		boolean mark = false;
		// 查询节点信息
		try {
			String[] idStr = id.split(",");
			int[] ids = new int[idStr.length];
			for (int i = 0; i < idStr.length; i++) {
				ids[i] = Integer.parseInt(idStr[i]);
			}
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("ids", ids);
			List<Equipment> eList = equipmentMapper.selectByIdStr(map);
			if (!CollectionUtils.isEmpty(eList)) {
				ControlHost host = controlHostMapper.selectByPrimaryKey(eList.get(0).getControlhostid());
				// 组装节点地址
				String ecode = "";
				for (Equipment e : eList) {
					ecode += e.getCode();
				}
				// 组装操作方式及节点个数
				byte listSize = (byte) eList.size();
				byte type = 0;
				if (optionType == 1) {
					type = 0x0F;
				}
				byte[] head = { type, listSize };
				byte[] data = codingFactory.byteMerger(head, codingFactory.string2BCD(ecode));

				// 组装发送指令
				byte[] sendData = codingFactory.coding((byte) 0x01, host.getCode(), (byte) 0x28, data);
				// 开始的时间
				Date startDate = new Date();
				Client.sendToServer(sendData);
				// 等待获取主机返回的指令，等待10秒
				String dataContext = "";
				try {
					dataContext = netWorkService.waitData(host.getCode(), "38", startDate);
				} catch (ParseException e1) {
					LOG.error("获取10秒后的时间时异常", e1);
					throw new ServerException(ErrorCode.ILLEGAL_PARAM);
				} catch (InterruptedException e1) {
					LOG.error("获取10秒后的时间时sleep异常", e1);
					throw new ServerException(ErrorCode.ILLEGAL_PARAM);
				}

				boolean flag = false;
				byte[] receiveData = null;
				if (!dataContext.equals("")) {
					receiveData = codingFactory.string2BCD(dataContext);
					flag = checkCoding.checkReceiveCoding(receiveData, sendData);
				}
				if (flag) {
					byte num = receiveData[12];
					switch (num) {
					case 0:
						mark = true;
						break;
					case 0x0F:
						mark = true;
						break;
					case 0x55:
						mark = false;
						break;
					default:
						break;
					}
				}

			}

		} catch (DataAccessException e) {
			if (optionType == 1) {
				LOG.error("关闭实时灌溉异常", e);
				throw new ServerException(ErrorCode.CLOSE_EQUIPMENT_FAILED);
			} else {
				LOG.error("开启实时灌溉异常", e);
				throw new ServerException(ErrorCode.OPEN_EQUIPMENT_FAILED);
			}
		}
		return mark;
	}

	@Override
	public Page<Equipment> selectEqtForList(int pageNow, int pageSize, Map<String, Object> criteria) {
		Map<String, Object> params = new HashMap<String, Object>();
		Page<Equipment> page = new Page<Equipment>(pageNow, pageSize);
		params.put(Constants.PAGE, page);
		if (criteria != null) {
			params.putAll(criteria);
		}
		List<Equipment> list = equipmentMapper.selectEqtForList(params);
		page.setResult(list);
		return page;
	}

	@Override
	public Equipment getEquipmentById(int eqtId) {
		try {
			return equipmentMapper.selectByPrimaryKey(eqtId);
		} catch (DataAccessException e) {
			LOG.error("获取节点信息失败", e);
			throw new ServerException(ErrorCode.SELECT_EQUIPMENT_LIST_FAILED);
		}

	}

	@Override
	public void updateEquipment(Equipment equipment, int userId) {
		try {
			int projectId = equipment.getProject().getId();
			ControlHost host = controlHostMapper.selectByProjectId(projectId);
			equipment.setControlhostid(host.getId());
			equipment.setModifyuser(userId);
			equipment.setModifytime(new Date());
			equipmentMapper.updateByPrimaryKeySelective(equipment);
		} catch (DataAccessException e) {
			LOG.error("更新节点信息失败", e);
			throw new ServerException(ErrorCode.UPDATE_EQUIPMENT_FAILED);
		}
	}

	@Override
	public void deleteEquipment(int eqtId) {
		try {
			equipmentMapper.deleteByPrimaryKey(eqtId);
		} catch (DataAccessException e) {
			LOG.error("删除节点信息失败", e);
			throw new ServerException(ErrorCode.DELETE_EQUIPMENT_FAILED);
		}

	}

	/**
	 * @Title:       searchEquipment
	 * @author:      杨贵松
	 * @time         2014年11月24日 下午11:26:42
	 * @Description: 搜索现场节点信息
	 * @throws
	 */
	@Override
	public List<EquipmentExt<SensorInfo>> searchEquipment(Integer pId) {
		List<EquipmentExt<SensorInfo>> list = new ArrayList<EquipmentExt<SensorInfo>>();
		// 查询节点信息
		try {
			ControlHost host = controlHostMapper.selectByProjectId(pId);
			if (host == null) {
				LOG.error("该项目下无主机");
				throw new ServerException(ErrorCode.PROJECT_HAS_NO_HOST);
			}

			byte[] data = {};

			// 组装发送指令
			byte[] sendData = codingFactory.coding((byte) 0x01, host.getCode(), (byte) 0x0B, data);
			// 开始的时间
			Date startDate = new Date();
			Client.sendToServer(sendData);
			// 等待获取主机返回的指令，等待20秒
			String dataContext = "";
			try {
				dataContext = netWorkService.waitDataForSearchEquipment(host.getCode(), "1B", startDate);
			} catch (ParseException e1) {
				LOG.error("获取20秒后的时间时异常", e1);
				throw new ServerException(ErrorCode.ILLEGAL_PARAM);
			} catch (InterruptedException e1) {
				LOG.error("获取20秒后的时间时sleep异常", e1);
				throw new ServerException(ErrorCode.ILLEGAL_PARAM);
			}

			boolean flag = false;
			byte[] receiveData = null;
			if (!dataContext.equals("")) {
				receiveData = codingFactory.string2BCD(dataContext);
				flag = checkCoding.checkReceiveCoding(receiveData, sendData);
			}else{
				LOG.error("未获取到返回的指令!");
				throw new ServerException(ErrorCode.SEARCH_EQUIPMENT_FAILED);
			}
			if (flag) {
				int num = receiveData[12];
				String usingData = dataContext.substring(26, dataContext.length() - 6);
				int numTmp = 0;
				while (num > 0) {
					String eCode = usingData.substring(numTmp, numTmp + 4);
					EquipmentExt<SensorInfo> equipmentExt = new EquipmentExt<SensorInfo>();
					equipmentExt.setCode(eCode);
					equipmentExt.setControlHostId(host.getId());

					int sNum = Integer.parseInt(usingData.substring(numTmp + 4, numTmp + 6));

					List<SensorInfo> slist = new ArrayList<SensorInfo>();
					for (int i = 0; i < sNum; i++) {
						SensorInfo si = new SensorInfo();
						si.setNumber(Integer.parseInt(usingData.substring( numTmp + 6 + 2 * i, numTmp + 6 + 2 * (i + 1))));
						slist.add(si);
					}
					equipmentExt.setResult(slist);
					list.add(equipmentExt);

					numTmp += 4 + 2 + sNum * 2;// 节点地址长度+传感器个数+传感器地址长度
					num--;
				}
			}else{
				LOG.error("返回的指令格式不正确!");
				throw new ServerException(ErrorCode.SEARCH_EQUIPMENT_FAILED);
			}
		} catch (DataAccessException e) {
			LOG.error("搜索节点异常", e);
			throw new ServerException(ErrorCode.SEARCH_EQUIPMENT_FAILED);
		}
		return list;
	}

	/**
	 * @Title:       save
	 * @author:      杨贵松
	 * @time         2014年11月26日 下午12:17:14
	 * @Description: 节点注册
	 * @throws
	 */
	@Override
	public void save(List<EquipmentExt<SensorInfo>> list, HttpSession session) {
		if(CollectionUtils.isEmpty(list)){
			LOG.error("节点信息为空");
			throw new ServerException(ErrorCode.SAVE_EQUIPMENT_LIST_NULL);
		}else if(registerEquipment(list)){//registerEquipment方法是向现场主机发送注册指令，现场注册完成才开始注册节点信息到数据库
			Date date;
			User user;
			try {
				date = CommonUtiles.getSystemDateTime();
				user = (User) session.getAttribute(Constants.USER);
			} catch (ParseException e) {
				LOG.error("获取系统时间异常!"+e);
				throw new ServerException(ErrorCode.ILLEGAL_PARAM);
			}
			
			try {
				//删除主机下所有节点及其相关联数据
				sensorInfoMapper.deleteAllByHid(list.get(0).getControlHostId());
				equipmentDataMapper.deleteAllByHid(list.get(0).getControlHostId());
				equipmentStatusMapper.deleteAllByHid(list.get(0).getControlHostId());
				equipmentMapper.deleteAllByHid(list.get(0).getControlHostId());
				
				for(EquipmentExt<SensorInfo> equipmentExt:list){
					Equipment equipment = new Equipment();
					equipment.setName(equipmentExt.getName());
					equipment.setCode(equipmentExt.getCode());
					equipment.setArea(equipmentExt.getArea());
					equipment.setControlhostid(equipmentExt.getControlHostId());
					equipment.setFowparameter(equipmentExt.getFowParameter());
					equipment.setIrrigationtype(1);
					equipment.setCreatetime(date);
					equipment.setCreateuser(user.getId());
					equipment.setModifytime(date);
					equipment.setModifyuser(user.getId());
					//保存节点信息到数据库
					int tmp = equipmentMapper.save(equipment);
					
					List<SensorInfo> sList = equipmentExt.getResult();
					List<SensorInfo> sensorList = new ArrayList<SensorInfo>();
					if(tmp>0 && !CollectionUtils.isEmpty(sList)){
						for(SensorInfo sensorInfo : sList){
							sensorInfo.setEquipmentid(equipment.getId());
							sensorInfo.setCreateuser(user.getId());
							sensorInfo.setCreatetime(date);
							sensorInfo.setModifytime(date);
							sensorInfo.setModifyuser(user.getId());
							
							sensorList.add(sensorInfo);
						}
						//保存传感器到数据库
						sensorInfoMapper.save(sensorList);
					}else{
						LOG.warn("该节点下无传感器");
					}
				}
			} catch (DataAccessException e) {
				LOG.error("注册节点异常", e);
				throw new ServerException(ErrorCode.SAVE_EQUIPMENT_FAILED);
			}
		}else{
			LOG.error("向主机注册节点信失败!");
			throw new ServerException(ErrorCode.SAVE_EQUIPMENT_FAILED);
		}
	}

	
	/**
	 * @Title:       registerEquipment
	 * @author:      杨贵松
	 * @time         2014年11月26日 下午5:35:38
	 * @Description: 注册节点信息到现场主机
	 * @return       boolean
	 * @throws
	 */
	private boolean registerEquipment(List<EquipmentExt<SensorInfo>> list){
		boolean mark = false;
		// 查询节点信息
		try {
			ControlHost host = controlHostMapper.selectByPrimaryKey(list.get(0).getControlHostId());
			// 组装节点传感器地址,即指令的data位
			String codeData = "";
			if(list.size()<10){
				codeData += "0"+list.size();
			}else{
				codeData += list.size();
			}
			for (EquipmentExt<SensorInfo> e : list) {
				codeData += e.getCode();
				List<SensorInfo> sList = e.getResult();
				if(!CollectionUtils.isEmpty(sList)){
					if(sList.size()<10){
						codeData += "0"+sList.size();
					}else{
						codeData += sList.size();
					}
					for(SensorInfo si:sList){
						codeData += "0"+si.getNumber();
					}
				}
			}
			
			byte[] data = codingFactory.string2BCD(codeData);
			
			// 组装发送指令
			byte[] sendData = codingFactory.coding((byte) 0x01, host.getCode(), (byte) 0x08, data);
			// 开始的时间
			Date startDate = new Date();
			Client.sendToServer(sendData);
			// 等待获取主机返回的指令，等待10秒
			String dataContext = "";
			try {
				dataContext = netWorkService.waitData(host.getCode(), "18", startDate);
			} catch (ParseException e1) {
				LOG.error("获取10秒后的时间时异常", e1);
				throw new ServerException(ErrorCode.ILLEGAL_PARAM);
			} catch (InterruptedException e1) {
				LOG.error("获取10秒后的时间时sleep异常", e1);
				throw new ServerException(ErrorCode.ILLEGAL_PARAM);
			}
			
			boolean flag = false;
			byte[] receiveData = null;
			if (!dataContext.equals("")) {
				receiveData = codingFactory.string2BCD(dataContext);
				flag = checkCoding.checkReceiveCoding(receiveData, sendData);
			}
			if (flag) {
				byte num = receiveData[12];
				switch (num) {
				case 0x0A:
					mark = true;
					break;
				case (byte) 0xA0:
					mark = false;
					break;
				default:
					break;
				}
			}

		} catch (DataAccessException e) {
			LOG.error("向主机注册节点信息异常", e);
			throw new ServerException(ErrorCode.SAVE_EQUIPMENT_FAILED);
		}
		return mark;
	}

	/**
	 * @Title:       selectEquipments
	 * @author:      杨贵松
	 * @time         2014年12月5日 下午10:11:08
	 * @Description: 查询节点详细信息
	 * @throws
	 */
	@Override
	public List<EquipmentExt<SensorInfo>> selectEquipments(Integer pId) {
		List<EquipmentExt<SensorInfo>> list = new ArrayList<EquipmentExt<SensorInfo>>();
		try {
			List<Equipment> eList = equipmentMapper.selectByPid(pId);
			if(!CollectionUtils.isEmpty(eList)){
				for(Equipment equipment:eList){
					EquipmentExt<SensorInfo> equipmentExt = new EquipmentExt<SensorInfo>();
					equipmentExt.setEquipment(equipment);
					List<SensorInfo> sList = sensorInfoMapper.selectSensorInfoByEid(equipment.getId());
					if(!CollectionUtils.isEmpty(eList)){
						equipmentExt.setResult(sList);
					}
					list.add(equipmentExt);
				}
			}else{
				LOG.error("查询节点信息为空！");
				throw new ServerException(ErrorCode.EQUIPMENT_LIST_NULL);
			}
		} catch (DataAccessException e) {
			LOG.error("查询节点信息失败", e);
			throw new ServerException(ErrorCode.SELECT_EQUIPMENT_LIST_FAILED);
		}
		return list;
	}

	/**
	 * @Title:       updateList
	 * @author:      杨贵松
	 * @time         2014年12月28日 下午4:43:21
	 * @Description: 批量设置节点及传感器信息
	 * @throws
	 */
	@Override
	public void updateList(List<Equipment> list, HttpSession session) {
		try {
			if(!CollectionUtils.isEmpty(list)){
				int cId = list.get(0).getControlhostid();
				ControlHost host = controlHostMapper.selectByPrimaryKey(cId);
				User user = (User) session.getAttribute(Constants.USER);
				List<Equipment> listOK = new ArrayList<Equipment>();
				List<Equipment> listError = new ArrayList<Equipment>();
				for(Equipment equipment:list){
					//1.模式设置
					boolean f1 = setModel(equipment,host.getCode());
					if(!f1){
						listError.add(equipment);
						continue;
					}
					//2.自控参数设置
					boolean f2 = setParam(equipment,host.getCode());
					if(!f2){
						listError.add(equipment);
						continue;
					}
					//3.设置ABCD参数值
					boolean f3 = setCoefficient(equipment,host.getCode());
					if(!f3){
						listError.add(equipment);
						continue;
					}
					//4.时段设置
					boolean f4 = true;
					if(equipment.getIrrigationtype()==2){
						f3 = setTimeLen(equipment,host.getCode());
					}
					if(f1&&f2&&f3&&f4){
						equipment.setModifyuser(user.getId());
						equipment.setModifytime(new Date());
						listOK.add(equipment);
						equipmentMapper.updateByPrimaryKeySelective(equipment);
					}else{
						listError.add(equipment);
					}
				}
				//将成功的节点信息保存到数据库
				if(CollectionUtils.isEmpty(listOK)){
					LOG.error("设置节点及传感器失败");
					throw new ServerException(ErrorCode.INIT_EQUIPMENT_INFO_FAILD);
				}else if(!CollectionUtils.isEmpty(listError)){
					String name = "";
					for(Equipment equipment:listError){
						name += equipment.getName()+"、";
					}
					LOG.error("设置【"+name.substring(0,name.length()-1)+"】等共计【"+listError.size()+"】个节点及传感器失败");
					throw new ServerException(ErrorCode.INIT_EQUIPMENT_INFO_FAILD);
				}
			}
		} catch (DataAccessException e) {
			LOG.error("设置节点及传感器失败", e);
			throw new ServerException(ErrorCode.INIT_EQUIPMENT_INFO_FAILD);
		}
	}
	
	/**
	 * @Title:       setModel
	 * @author:      杨贵松
	 * @time         2014年12月29日 下午3:07:39
	 * @Description: 单独设置一个节点的控制模式
	 * @return       boolean
	 * @throws
	 */
	public boolean setModel(Equipment equipment,String cCode){
		boolean mark = false;
		// 查询节点信息
		try {
			byte[] model = new byte[1];
			switch(equipment.getIrrigationtype()){
			case 0 :
				model[0] = (byte) 0xF2;//手动模式
				break;
			case 1 : 
				model[0] = (byte) 0xF0;//自动模式
				break;
			case 2 : 
				model[0] = (byte) 0xF1;//时段模式
				break;
			default:
				break;
			}
			
			byte[] data = codingFactory.byteMerger(model, codingFactory.string2BCD("01"+equipment.getCode()));
			
			// 组装发送指令
			byte[] sendData = codingFactory.coding((byte) 0x01, cCode, (byte) 0x22, data);
			// 开始的时间
			Date startDate = new Date();
			Client.sendToServer(sendData);
			// 等待获取主机返回的指令，等待10秒
			String dataContext = "";
			try {
				dataContext = netWorkService.waitData(cCode, "32", startDate);
			} catch (ParseException e1) {
				LOG.error("获取10秒后的时间时异常", e1);
				throw new ServerException(ErrorCode.ILLEGAL_PARAM);
			} catch (InterruptedException e1) {
				LOG.error("获取10秒后的时间时sleep异常", e1);
				throw new ServerException(ErrorCode.ILLEGAL_PARAM);
			}
			
			boolean flag = false;
			byte[] receiveData = null;
			if (!dataContext.equals("")) {
				receiveData = codingFactory.string2BCD(dataContext);
				flag = checkCoding.checkReceiveCoding(receiveData, sendData);
			}
			if (flag) {
				byte num = receiveData[12];
				switch (num) {
				case 0:
					mark = false;
					break;
				case (byte) 0xF0:
					mark = true;
					break;
				case (byte) 0xF1:
					mark = true;
					break;
				case (byte) 0xF2:
					mark = true;
					break;
				default:
					break;
				}
			}
		} catch (DataAccessException e) {
			LOG.error("设置节点控制模式异常", e);
			throw new ServerException(ErrorCode.SET_EQUIPMENT_MODEL_FAILD);
		}
		return mark;
	}
	
	/**
	 * @Title:       setParam
	 * @author:      杨贵松
	 * @time         2014年12月29日 下午3:08:17
	 * @Description: 单独设置一个节点的自控参数
	 * @return       boolean
	 * @throws
	 */
	public boolean setParam(Equipment equipment,String cCode){
		boolean mark = false;
		// 查询节点信息
		try {
			byte[] model = new byte[8];
			float humidityUp = equipment.getHumidityup();
			float humidityDown = equipment.getHumiditydown();
			float soilWater = equipment.getSoilwater();

			BigDecimal a = new BigDecimal(humidityUp * soilWater);
			BigDecimal b = new BigDecimal(humidityDown * soilWater);
			float hUp = a.setScale(2, BigDecimal.ROUND_HALF_UP).floatValue();
			float hDown = b.setScale(2, BigDecimal.ROUND_HALF_UP).floatValue();
			float tUp = equipment.getTemperatureup();
			float tDown = equipment.getTemperaturedown();
			
			model[0] = (byte) ((int) (hUp * 100) / 100);
			model[1] = (byte) ((int) (hUp * 100) % 100);
			model[2] = (byte) ((int) (hDown * 100) / 100);
			model[3] = (byte) ((int) (hDown * 100) % 100);

			// 温度值转换
			if (tUp < 0) {
				model[4] = (byte) ((int) (tUp * 100) / 100);
				model[5] = (byte) ((int) (-tUp * 100) % 100);
			} else {
				model[4] = (byte) ((int) (tUp * 100) / 100);
				model[5] = (byte) ((int) (tUp * 100) % 100);
			}
			if (tDown < 0) {
				model[6] = (byte) ((int) (tDown * 100) / 100);
				model[7] = (byte) ((int) (-tDown * 100) % 100);
			} else {
				model[6] = (byte) ((int) (tDown * 100) / 100);
				model[7] = (byte) ((int) (tDown * 100) % 100);
			}
			
			byte[] data = codingFactory.byteMerger(model, codingFactory.string2BCD("01"+equipment.getCode()));
			
			// 组装发送指令
			byte[] sendData = codingFactory.coding((byte) 0x01, cCode, (byte) 0x24, data);
			// 开始的时间
			Date startDate = new Date();
			Client.sendToServer(sendData);
			// 等待获取主机返回的指令，等待10秒
			String dataContext = "";
			try {
				dataContext = netWorkService.waitData(cCode, "34", startDate);
			} catch (ParseException e1) {
				LOG.error("获取10秒后的时间时异常", e1);
				throw new ServerException(ErrorCode.ILLEGAL_PARAM);
			} catch (InterruptedException e1) {
				LOG.error("获取10秒后的时间时sleep异常", e1);
				throw new ServerException(ErrorCode.ILLEGAL_PARAM);
			}
			
			boolean flag = false;
			byte[] receiveData = null;
			if (!dataContext.equals("")) {
				receiveData = codingFactory.string2BCD(dataContext);
				flag = checkCoding.checkReceiveCoding(receiveData, sendData);
			}
			if (flag) {
				byte num = receiveData[12];
				switch (num) {
				case 0x0A:
					mark = true;
					break;
				case (byte) 0xA0:
					mark = false;
					break;
				default:
					break;
				}
			}
		} catch (DataAccessException e) {
			LOG.error("设置节点自控参数异常", e);
			throw new ServerException(ErrorCode.SET_EQUIPMENT_PARAM_FAILD);
		}
		return mark;
	}
	
	/**
	 * @Title:       setCoefficient
	 * @author:      杨贵松
	 * @time         2014年12月29日 下午9:36:30
	 * @Description: 设置a、b、c、d系数到主机
	 * @return       boolean
	 * @throws
	 */
	public boolean setCoefficient(Equipment equipment,String cCode){
		boolean mark = false;
		// 查询节点信息
		try {
			byte[] param = new byte[8];
			SoilInfo soil = soilInfoMapper.selectByPrimaryKey(equipment.getSoilname());
			float paramA = soil.getParametera();
			float paramB = soil.getParameterb();
			float paramC = soil.getParameterc();
			float paramD = soil.getParameterd();
			
			// a、b、c、d参数值转换
			if (paramA < 0) {
				param[0] = (byte) ((int) (paramA * 100) / 100);
				param[1] = (byte) ((int) (-paramA * 100) % 100);
			} else {
				param[0] = (byte) ((int) (paramA * 100) / 100);
				param[1] = (byte) ((int) (paramA * 100) % 100);
			}
			
			if (paramB < 0) {
				param[2] = (byte) ((int) (paramB * 100) / 100);
				param[3] = (byte) ((int) (-paramB * 100) % 100);
			} else {
				param[2] = (byte) ((int) (paramB * 100) / 100);
				param[3] = (byte) ((int) (paramB * 100) % 100);
			}
			
			if (paramC < 0) {
				param[4] = (byte) ((int) (paramC * 100) / 100);
				param[5] = (byte) ((int) (-paramC * 100) % 100);
			} else {
				param[4] = (byte) ((int) (paramC * 100) / 100);
				param[5] = (byte) ((int) (paramC * 100) % 100);
			}
			
			if (paramD < 0) {
				param[6] = (byte) ((int) (paramD * 100) / 100);
				param[7] = (byte) ((int) (-paramD * 100) % 100);
			} else {
				param[6] = (byte) ((int) (paramD * 100) / 100);
				param[7] = (byte) ((int) (paramD * 100) % 100);
			}
			
			byte[] data = codingFactory.byteMerger(param, codingFactory.string2BCD("01"+equipment.getCode()));
			
			// 组装发送指令
			byte[] sendData = codingFactory.coding((byte) 0x01, cCode, (byte) 0x29, data);
			// 开始的时间
			Date startDate = new Date();
			Client.sendToServer(sendData);
			// 等待获取主机返回的指令，等待10秒
			String dataContext = "";
			try {
				dataContext = netWorkService.waitData(cCode, "39", startDate);
			} catch (ParseException e1) {
				LOG.error("获取10秒后的时间时异常", e1);
				throw new ServerException(ErrorCode.ILLEGAL_PARAM);
			} catch (InterruptedException e1) {
				LOG.error("获取10秒后的时间时sleep异常", e1);
				throw new ServerException(ErrorCode.ILLEGAL_PARAM);
			}
			
			boolean flag = false;
			byte[] receiveData = null;
			if (!dataContext.equals("")) {
				receiveData = codingFactory.string2BCD(dataContext);
				flag = checkCoding.checkReceiveCoding(receiveData, sendData);
			}
			if (flag) {
				byte num = receiveData[12];
				switch (num) {
				case 0x0A:
					mark = true;
					break;
				case (byte) 0xA0:
					mark = false;
				break;
				default:
					break;
				}
			}
		} catch (DataAccessException e) {
			LOG.error("设置土壤传感器精度参数异常", e);
			throw new ServerException(ErrorCode.SET_EQUIPMENT_ABCD_FAILD);
		}
		return mark;
	}
	
	/**
	 * @Title:       setTimeLen
	 * @author:      杨贵松
	 * @time         2014年12月29日 下午3:08:22
	 * @Description: 单独设置一个节点的时段
	 * @return       boolean
	 * @throws
	 */
	public boolean setTimeLen(Equipment equipment,String cCode){
		boolean mark = false;
		// 查询节点信息
		try {
			
			String startone = equipment.getTimeonestart();
			String endone = equipment.getTimeoneend();
			String starttwo = equipment.getTimetwostart();
			String endtwo = equipment.getTimetwoend();
			String startthree = equipment.getTimethreestart();
			String endthree = equipment.getTimethreeend();
			
			SimpleDateFormat sdf = new SimpleDateFormat("hhmm");
			String timeone="";
			String timetwo="";
			String timethree="";
			if(!startone.equals("")){
				timeone = sdf.format(startone)+sdf.format(endone);
			}else{
				timeone = "24002400";
			}
			
			if(!starttwo.equals("")){
				timetwo = sdf.format(starttwo)+sdf.format(endtwo);
			}else{
				timetwo = "24002400";
			}
			
			if(!startthree.equals("")){
				timethree = sdf.format(startthree)+sdf.format(endthree);
			}else{
				timethree = "24002400";
			}
			
			String timeLen = "";
			String[] week = {};
			int T0 =0;
			if(!equipment.getWeek().equals("")){
				week = equipment.getWeek().split(",");
				T0 = week.length;
				for(int i=0;i<T0;i++){
					timeLen += "0"+week[i];
				}
			}
			
			byte[] data = codingFactory.byteMerger(codingFactory.string2BCD(timeone+timetwo+timethree+"01"+equipment.getCode()),codingFactory.string2BCD("0"+T0+timeLen));
			
			// 组装发送指令
			byte[] sendData = codingFactory.coding((byte) 0x01, cCode, (byte) 0x26, data);
			// 开始的时间
			Date startDate = new Date();
			Client.sendToServer(sendData);
			// 等待获取主机返回的指令，等待10秒
			String dataContext = "";
			try {
				dataContext = netWorkService.waitData(cCode, "36", startDate);
			} catch (ParseException e1) {
				LOG.error("获取10秒后的时间时异常", e1);
				throw new ServerException(ErrorCode.ILLEGAL_PARAM);
			} catch (InterruptedException e1) {
				LOG.error("获取10秒后的时间时sleep异常", e1);
				throw new ServerException(ErrorCode.ILLEGAL_PARAM);
			}
			
			boolean flag = false;
			byte[] receiveData = null;
			if (!dataContext.equals("")) {
				receiveData = codingFactory.string2BCD(dataContext);
				flag = checkCoding.checkReceiveCoding(receiveData, sendData);
			}
			if (flag) {
				byte num = receiveData[12];
				switch (num) {
				case 0x0A:
					mark = true;
					break;
				case (byte) 0xA0:
					mark = false;
					break;
				default:
					break;
				}
			}
		} catch (DataAccessException e) {
			LOG.error("设置节点时段控制异常", e);
			throw new ServerException(ErrorCode.SET_EQUIPMENT_PARAM_FAILD);
		}
		return mark;
	}
}
