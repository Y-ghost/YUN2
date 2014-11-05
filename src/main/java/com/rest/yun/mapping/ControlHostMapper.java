package com.rest.yun.mapping;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.rest.yun.beans.ControlHost;

public interface ControlHostMapper {
	int deleteByPrimaryKey(Integer id);

	int insert(ControlHost record);

	int insertSelective(ControlHost record);

	ControlHost selectByPrimaryKey(Integer id);

	int updateByPrimaryKeySelective(ControlHost record);

	int updateByPrimaryKey(ControlHost record);

	List<Map<String, Object>> selectHostForList(Map<String, Object> params);

	ControlHost selectByProjectId(int projectId);

	/**
	 * 验证host code 是否存在
	 * 
	 * @param code
	 * @param hostId
	 *            if hostId = 0,验证所有的host，if hostId != 0,表示验证除了这个host之外其他所用的host
	 * @return
	 */
	boolean validHostCodeExceptById(@Param("code") String code, @Param("hostId") int hostId);

	/**
	 * 获取host的基本信息和项目的部分信息
	 * 
	 * @param hostId
	 * @return
	 */
	Map<String, Object> getHostAndProjectByHostId(int hostId);
}