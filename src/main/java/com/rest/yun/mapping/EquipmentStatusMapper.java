package com.rest.yun.mapping;

import java.util.List;

import com.rest.yun.beans.EquipmentStatus;

public interface EquipmentStatusMapper {
    int deleteByPrimaryKey(Integer id) throws Exception;

//    批量添加节点状态数据
    int insert(List<EquipmentStatus> listStatus) throws Exception;

    int insertSelective(EquipmentStatus record) throws Exception;

    EquipmentStatus selectByPrimaryKey(Integer id) throws Exception;

    int updateByPrimaryKeySelective(EquipmentStatus record) throws Exception;

    int updateByPrimaryKey(EquipmentStatus record) throws Exception;

	/** 
	 * @Title:       selectEquipmentStatusByeEid
	 * @author:      杨贵松
	 * @time         2014年11月6日 上午1:16:25
	 * @Description: 根据节点id查询其状态数据
	 * @return       EquipmentStatus
	 * @throws
	 */
	EquipmentStatus selectEquipmentStatusByeEid(Integer eId) throws Exception;

}