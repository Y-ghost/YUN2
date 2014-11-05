package com.rest.yun.service.Impl;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.rest.yun.beans.Equipment;
import com.rest.yun.beans.EquipmentData;
import com.rest.yun.beans.EquipmentStatus;
import com.rest.yun.beans.SensorInfo;
import com.rest.yun.dto.EquipmentExt;
import com.rest.yun.exception.ErrorCode;
import com.rest.yun.exception.ServerException;
import com.rest.yun.mapping.EquipmentDataMapper;
import com.rest.yun.mapping.EquipmentMapper;
import com.rest.yun.mapping.EquipmentStatusMapper;
import com.rest.yun.mapping.SensorInfoMapper;
import com.rest.yun.service.IEquipmentService;

@Service
public class EquipmentServiceImpl implements IEquipmentService{
	private final static Logger LOG = LoggerFactory.getLogger(EquipmentServiceImpl.class);
	
	@Autowired
	private EquipmentMapper equipmentMapper;
	@Autowired
	private SensorInfoMapper sensorInfoMapper;
	@Autowired
	private EquipmentDataMapper equipmentDataMapper;
	@Autowired
	private EquipmentStatusMapper equipmentStatusMapper;
	

	/** 
	 * @Title:       selectEquipmentExt
	 * @author:      杨贵松
	 * @time         2014年11月6日 上午12:22:45
	 * @Description: 查询实时现场数据
	 */
	@Override
	public List<EquipmentExt> selectEquipmentExt(Integer pId) {
		List<EquipmentExt> list = new ArrayList<EquipmentExt>();
		try {
			List<Equipment> eList = equipmentMapper.selectByPid(pId);
			if(!CollectionUtils.isEmpty(eList)){
				for(Equipment equipment:eList){
					EquipmentExt equipmentExt = new EquipmentExt();
					EquipmentStatus equipmentStatus = equipmentStatusMapper.selectEquipmentStatusByeEid(equipment.getId());
					List<SensorInfo> sList = sensorInfoMapper.selectSensorInfoByEid(equipment.getId());
					List<EquipmentData> edList = new ArrayList<EquipmentData>();
					for(SensorInfo sensor:sList){
						EquipmentData equipmentData = equipmentDataMapper.selectByPrimaryKey(sensor.getId());
						if(equipmentData==null){
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
			}else{
				LOG.warn("Equipment is null");
				throw new ServerException(ErrorCode.EQUIPMENT_LIST_NULL);
			}
		} catch (Exception e) {
			LOG.error("查询实时现场数据异常",e);
			throw new ServerException(ErrorCode.SELECT_EQUIPMENT_LIST_FAILED);
		}
		return list;
	}


}
