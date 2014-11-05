package com.rest.yun.mapping;

import java.util.Map;

import com.rest.yun.beans.Equipment;

public interface EquipmentMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Equipment record);

    int insertSelective(Equipment record);

    Equipment selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Equipment record);

    int updateByPrimaryKey(Equipment record);

	/** 
	 * @Title:       selectEquipmentByHcodeAndEcode
	 * @author:      杨贵松
	 * @Description: 根据Hcode和Ecode查询节点 
	 * @return       Equipment
	 * @throws 
	 */
	Equipment selectEquipmentByHcodeAndEcode(Map<String, Object> map);
}