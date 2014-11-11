package com.rest.yun.service.Impl;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.rest.yun.service.IEquipmentService;
import com.rest.yun.service.NetWorkService;
import com.rest.yun.util.CheckReceiveCodingUtil;
import com.rest.yun.util.CodingFactoryUtil;
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
	private NetWorkService netWorkService;

	/**
	 * @Title: selectEquipmentExt
	 * @author: 杨贵松
	 * @time 2014年11月6日 上午12:22:45
	 * @Description: 查询实时现场数据
	 */
	@Override
	public List<EquipmentExt> selectEquipmentExt(Integer pId) {
		List<EquipmentExt> list = new ArrayList<EquipmentExt>();
		try {
			List<Equipment> eList = equipmentMapper.selectByPid(pId);
			if (!CollectionUtils.isEmpty(eList)) {
				for (Equipment equipment : eList) {
					EquipmentExt equipmentExt = new EquipmentExt();
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
					equipmentExt.setEquipmentData(edList);

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
					mark = false;
					throw new ServerException(ErrorCode.ILLEGAL_PARAM);
				} catch (InterruptedException e1) {
					LOG.error("获取10秒后的时间时sleep异常", e1);
					mark = false;
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
				mark = false;
				throw new ServerException(ErrorCode.CLOSE_EQUIPMENT_FAILED);
			} else {
				LOG.error("开启实时灌溉异常", e);
				mark = false;
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
}
