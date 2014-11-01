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
}