package com.rest.yun.service.Impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.rest.yun.beans.Equipment;
import com.rest.yun.beans.EquipmentData;
import com.rest.yun.beans.EquipmentStatus;
import com.rest.yun.beans.SensorInfo;
import com.rest.yun.dto.EquipmentDataExt;
import com.rest.yun.dto.EquipmentExt;
import com.rest.yun.exception.ErrorCode;
import com.rest.yun.exception.ServerException;
import com.rest.yun.mapping.EquipmentDataMapper;
import com.rest.yun.mapping.EquipmentMapper;
import com.rest.yun.mapping.EquipmentStatusMapper;
import com.rest.yun.mapping.SensorInfoMapper;
import com.rest.yun.service.IStatisticService;
import com.rest.yun.util.CommonUtiles;

@Service
public class StatisticServiceImpl implements IStatisticService {

	private final static Logger LOG = LoggerFactory.getLogger(StatisticServiceImpl.class);

	@Autowired
	private EquipmentMapper equipmentMapper;
	@Autowired
	private EquipmentStatusMapper equipmentStatusMapper;
	@Autowired
	private SensorInfoMapper sensorInfoMapper;
	@Autowired
	private EquipmentDataMapper equipmentDataMapper;

	/**
	 * @Title:       selectEquipmentExtsBy
	 * @author:      杨贵松
	 * @time         2014年12月30日 上午6:37:48
	 * @Description: 分页统计节点数据
	 * @throws
	 */
//	@Override
//	public Page<EquipmentExt<EquipmentData>> selectEquipmentExtsBy( Integer pageNow, Integer pageSize, Map<String, Object> criteria, Integer pId) {
//		Map<String, Object> params = new HashMap<String, Object>();
//		Page<EquipmentExt<EquipmentData>> page = new Page<EquipmentExt<EquipmentData>>(pageNow, pageSize);
//		params.put(Constants.PAGE, page);
//		params.put("pId", pId);
//		if (criteria != null) {
//			params.putAll(criteria);
//		}
//		
//		List<EquipmentExt<EquipmentData>> list = new ArrayList<EquipmentExt<EquipmentData>>();
//		try {
//			List<Equipment> eList = equipmentMapper.selectByPage(params);
//			if (!CollectionUtils.isEmpty(eList)) {
//				for (Equipment equipment : eList) {
//					EquipmentExt<EquipmentData> equipmentExt = new EquipmentExt<EquipmentData>();
//					EquipmentStatus equipmentStatus = equipmentStatusMapper.selectEquipmentStatusByeEid(equipment.getId());
//					List<SensorInfo> sList = sensorInfoMapper.selectSensorInfoByEid(equipment.getId());
//					List<EquipmentData> edList = new ArrayList<EquipmentData>();
//					for (SensorInfo sensor : sList) {
//						EquipmentData equipmentData = equipmentDataMapper.selectByPrimaryKey(sensor.getId());
//						if (equipmentData == null) {
//							equipmentData = new EquipmentData();
//							equipmentData.setHumidity((float) 0);
//							equipmentData.setSensorid(sensor.getId());
//						}
//						edList.add(equipmentData);
//					}
//
//					equipmentExt.setId(equipment.getId());
//					equipmentExt.setName(equipment.getName());
//					equipmentExt.setCode(equipment.getCode());
//					equipmentExt.setControlHostId(equipment.getControlhostid());
//					equipmentExt.setEquipmentStatus(equipmentStatus);
//					equipmentExt.setEquipment(equipment);
//					equipmentExt.setResult(edList);
//
//					list.add(equipmentExt);
//				}
//			} else {
//				LOG.warn("Equipment is null");
//				throw new ServerException(ErrorCode.EQUIPMENT_LIST_NULL);
//			}
//		} catch (DataAccessException e) {
//			LOG.error("查询实时现场数据异常", e);
//			throw new ServerException(ErrorCode.SELECT_EQUIPMENT_LIST_FAILED);
//		}
//		page.setResult(list);
//		return page;
//	}

	/**
	 * @Title:       waterList
	 * @author:      杨贵松
	 * @time         2015年1月14日 上午5:45:32
	 * @Description: 统计灌溉用水量
	 * @throws
	 */
	@Override
	public List<EquipmentExt<EquipmentStatus>> waterList(Integer pId, Integer eId, Date startDate, Date endDate) {
		List<EquipmentExt<EquipmentStatus>> list = new ArrayList<EquipmentExt<EquipmentStatus>>();
				
		List<Date> dateList = new ArrayList<Date>();
		dateList = CommonUtiles.betweenDayList(startDate,endDate);
		
		//统计日期为空的话终止执行
		if(CollectionUtils.isEmpty(dateList)){
			LOG.error("统计日期不能为空");
			throw new ServerException(ErrorCode.STATISTIC_DATE_NULL);
		}
		
		List<Equipment> eList = new ArrayList<Equipment>();
		try {
			//查询节点
			if(eId==-1){
				eList = equipmentMapper.selectByPid(pId);
			}else{
				Equipment equipment = equipmentMapper.selectByPrimaryKey(eId);
				eList.add(equipment);
			}
		} catch (DataAccessException e) {
			LOG.error("统计灌水量异常",e);
			throw new ServerException(ErrorCode.STATISTIC_WATER_FAILED);
		}
		if(CollectionUtils.isEmpty(eList)){
			LOG.error("统计分析未查询到节点");
			throw new ServerException(ErrorCode.STATISTIC_EQUIPMENT_NULL);
		}
		
		//根据节点查询状态水量
		try {
			for(Equipment e:eList){
				EquipmentExt<EquipmentStatus> equipmentExt = new EquipmentExt<EquipmentStatus>();
				equipmentExt.setEquipment(e);
				
				//查询每个日期的总灌水量
				List<EquipmentStatus> statusList = new ArrayList<EquipmentStatus>();
				for(Date date : dateList){
					EquipmentStatus equipmentStatus = new EquipmentStatus();
					equipmentStatus.setCreatetime(date);
					equipmentStatus.setEquipmentid(e.getId());
					long currentvalue = equipmentStatusMapper.selectEquipmentStatusByEidDate(equipmentStatus);
					equipmentStatus.setCurrentvalue(currentvalue);
					
					statusList.add(equipmentStatus);
				}
				equipmentExt.setResult(statusList);
				
				list.add(equipmentExt);
			}
		} catch (DataAccessException e) {
			LOG.error("统计灌水量异常",e);
			throw new ServerException(ErrorCode.STATISTIC_WATER_FAILED);
		}

		return list;
	}

	/**
	 * @Title:       humidityList
	 * @author:      杨贵松
	 * @time         2015年1月14日 上午5:45:36
	 * @Description: 统计灌区湿度值
	 * @throws
	 */
	@Override
	public List<EquipmentDataExt<EquipmentData>> humidityList(Integer pId, Integer eId, Date startDate, Date endDate) {
		List<EquipmentDataExt<EquipmentData>> list = new ArrayList<EquipmentDataExt<EquipmentData>>();
		
		List<Date> dateList = new ArrayList<Date>();
		dateList = CommonUtiles.betweenDayList(startDate,endDate);
		//统计日期为空的话终止执行
		if(CollectionUtils.isEmpty(dateList)){
			LOG.error("统计日期不能为空");
			throw new ServerException(ErrorCode.STATISTIC_DATE_NULL);
		}
		
		List<Equipment> eList = new ArrayList<Equipment>();
		try {
			//查询节点
			if(eId==-1){
				eList = equipmentMapper.selectByPid(pId);
			}else{
				Equipment equipment = equipmentMapper.selectByPrimaryKey(eId);
				eList.add(equipment);
			}
		} catch (DataAccessException e) {
			LOG.error("统计灌区湿度异常",e);
			throw new ServerException(ErrorCode.STATISTIC_HUMIDITY_FAILED);
		}
		
		if(CollectionUtils.isEmpty(eList)){
			LOG.error("统计分析未查询到节点");
			throw new ServerException(ErrorCode.STATISTIC_EQUIPMENT_NULL);
		}
		
		//根据节点查询湿度值
		try {
			for(Equipment e:eList){
				List<SensorInfo> sList = sensorInfoMapper.selectSensorInfoByEid(e.getId());
				
				if(CollectionUtils.isEmpty(sList)){
					//如果该节点下无传感器，跳过本次循环
					continue;
				}
				
				for(SensorInfo sensor:sList){
					EquipmentDataExt<EquipmentData> equipmentDataExt = new EquipmentDataExt<EquipmentData>();
					equipmentDataExt.setEquipment(e);
					equipmentDataExt.setSensor(sensor);
					
					//查询每个日期的湿度值
					List<EquipmentData> dList = new ArrayList<EquipmentData>();
					for(Date date : dateList){
						EquipmentData equipmentData = new EquipmentData();
						equipmentData.setCreatetime(date);
						equipmentData.setSensorid(sensor.getId());
						
						float humidity = equipmentDataMapper.selectHumidityBySid(equipmentData);
						equipmentData.setHumidity(humidity);
						
						dList.add(equipmentData);
					}
					equipmentDataExt.setResult(dList);
					list.add(equipmentDataExt);
				}
			}
		} catch (DataAccessException e) {
			LOG.error("统计灌区湿度异常",e);
			throw new ServerException(ErrorCode.STATISTIC_HUMIDITY_FAILED);
		}
		
		return list;
	}

}
