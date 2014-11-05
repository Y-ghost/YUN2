package com.rest.yun.mapping;

import java.util.List;
import java.util.Map;

import com.rest.yun.beans.Equipment;

public interface EquipmentMapper {
    int deleteByPrimaryKey(Integer id) throws Exception;

    int insert(Equipment record) throws Exception;

    int insertSelective(Equipment record) throws Exception;

    Equipment selectByPrimaryKey(Integer id) throws Exception;

    int updateByPrimaryKeySelective(Equipment record) throws Exception;

    int updateByPrimaryKey(Equipment record) throws Exception;

	/** 
	 * @Title:       selectEquipmentByHcodeAndEcode
	 * @author:      杨贵松
	 * @Description: 根据Hcode和Ecode查询节点 
	 * @return       Equipment
	 * @throws 
	 */
	Equipment selectEquipmentByHcodeAndEcode(Map<String, Object> map) throws Exception;

	/** 
	 * @Title:       selectByPid
	 * @author:      杨贵松
	 * @time         2014年11月6日 上午12:53:40
	 * @Description: 根据项目id查询节点信息
	 * @return       List<Equipment>
	 * @throws 
	 */
	List<Equipment> selectByPid(Integer pId) throws Exception;
}