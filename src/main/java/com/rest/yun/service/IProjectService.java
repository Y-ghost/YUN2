package com.rest.yun.service;

import java.util.Map;

import com.rest.yun.beans.Project;
import com.rest.yun.dto.Page;

public interface IProjectService {

	/**
	 * Save Project
	 * 
	 * @param project
	 */
	void saveProject(Project project);

	void deleteProject(int projectId);

	void updateProject(Project project);

	Page<Project> selectProjectBy(int pageNow, int pageSize, Map<String, Object> criteria);

}
