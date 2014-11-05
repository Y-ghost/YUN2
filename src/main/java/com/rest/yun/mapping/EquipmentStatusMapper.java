package com.rest.yun.mapping;

import java.util.List;

import com.rest.yun.beans.EquipmentStatus;

public interface EquipmentStatusMapper {
    int deleteByPrimaryKey(Integer id);

//    批量添加节点状态数据
    int insert(List<EquipmentStatus> listStatus);

    int insertSelective(EquipmentStatus record);

    EquipmentStatus selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(EquipmentStatus record);

    int updateByPrimaryKey(EquipmentStatus record);

	/** 
	 * @Title:       selectEquipmentStatusByeEid
	 * @author:      杨贵松
	 * @Description: 根据节点id查询其状态数据
	 * @return       EquipmentStatus
	 * @throws 
	 */
	EquipmentStatus selectEquipmentStatusByeEid(Integer eId);
}