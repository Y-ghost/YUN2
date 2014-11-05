package com.rest.yun.mapping;

import java.util.List;
import java.util.Map;

import com.rest.yun.beans.SensorInfo;

public interface SensorInfoMapper {
    int deleteByPrimaryKey(Integer id) throws Exception;

    int insert(SensorInfo record) throws Exception;

    int insertSelective(SensorInfo record) throws Exception;

    SensorInfo selectByPrimaryKey(Integer id) throws Exception;

    int updateByPrimaryKeySelective(SensorInfo record) throws Exception;

    int updateByPrimaryKey(SensorInfo record) throws Exception;

	/** 
	 * @Title:       selectByEidAndNum
	 * @author:      杨贵松
	 * @Description: 根据节点id和传感器number查询传感器信息 
	 * @return       SensorInfo
	 * @throws 
	 */
	SensorInfo selectByEidAndNum(Map<String,Object> map) throws Exception;

	/** 
	 * @Title:       selectSensorInfoByEid
	 * @author:      杨贵松
	 * @time         2014年11月6日 上午3:55:08
	 * @Description: 查询节点下的传感器
	 * @return       List<SensorInfo>
	 * @throws 
	 */
	List<SensorInfo> selectSensorInfoByEid(Integer eId) throws Exception;
}