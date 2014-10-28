package com.rest.yun.mapping;

import java.util.List;
import java.util.Map;

import com.rest.yun.beans.Project;

public interface ProjectMapper {
	int deleteByPrimaryKey(Integer id);

	int insert(Project record);

	int insertSelective(Project record);

	Project selectByPrimaryKey(Integer id);

	int updateByPrimaryKeySelective(Project record);

	int updateByPrimaryKey(Project record);

	List<Project> selectProjectForList(Map<String, Object> params);
}