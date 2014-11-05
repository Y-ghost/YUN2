package com.rest.yun.mapping;

import java.util.List;
import java.util.Map;

import com.rest.yun.beans.DataTemp;

public interface DataTempMapper {
	
	DataTemp selectDataTemp(Map<String, Object> map) throws Exception;

	void insert(DataTemp dataTemp) throws Exception;

	List<DataTemp> selectAllOldData() throws Exception;

	void deleteAllOldData(List<DataTemp> list) throws Exception;

	DataTemp selectDataMax(Map<String, Object> map) throws Exception;

	/** 
	 * @Title:       selectDataCount
	 * @author:      杨贵松
	 * @time         2014年11月5日 上午2:35:50
	 * @Description: 通过检查心跳包，监测判断主机是否在线 
	 * @return       int
	 * @throws 
	 */
	int selectDataCount(Map<String, Object> dataTmp) throws Exception;
}