package com.rest.yun.mapping;

import java.util.List;
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

	/** 
	 * @Title:       selectSensorInfoByEid
	 * @author:      杨贵松
	 * @time         2014年11月6日 上午3:55:08
	 * @Description: 查询节点下的传感器
	 * @return       List<SensorInfo>
	 * @throws 
	 */
	List<SensorInfo> selectSensorInfoByEid(Integer eId);
}