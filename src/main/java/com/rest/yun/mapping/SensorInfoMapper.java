package com.rest.yun.mapping;

import java.util.Map;

import com.rest.yun.beans.SensorInfo;

public interface SensorInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(SensorInfo record);

    int insertSelective(SensorInfo record);

    SensorInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(SensorInfo record);

    int updateByPrimaryKey(SensorInfo record);

	/** 
	 * @Title:       selectByEidAndNum
	 * @author:      杨贵松
	 * @Description: 根据节点id和传感器number查询传感器信息 
	 * @return       SensorInfo
	 * @throws 
	 */
	SensorInfo selectByEidAndNum(Map<String,Object> map);
}