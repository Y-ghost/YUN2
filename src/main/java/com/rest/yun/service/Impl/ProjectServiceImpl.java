package com.rest.yun.service.Impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.rest.yun.beans.Project;
import com.rest.yun.dto.Page;
import com.rest.yun.exception.ErrorCode;
import com.rest.yun.exception.ServerException;
import com.rest.yun.mapping.ProjectMapper;
import com.rest.yun.service.IProjectService;

@Service
public class ProjectServiceImpl implements IProjectService {

	private final static Logger LOG = LoggerFactory.getLogger(ProjectServiceImpl.class);

	@Autowired
	private ProjectMapper projectMapper;

	@Override
	public void saveProject(Project project) {
		if (project == null) {
			LOG.warn("Project is null");
			throw new ServerException(ErrorCode.ILLEGAL_PARAM);
		}

		// Validation parameters

		try {
			projectMapper.insertSelective(project);
		} catch (DataAccessException e) {
			LOG.error("Save project appear exception", e);
			throw new ServerException(ErrorCode.SAVE_PROJECT_FAILED);
		}
	}

	@Override
	public void deleteProject(int projectId) {
		if (projectId == 0) {
			LOG.warn("Invalid project Id");
			throw new ServerException(ErrorCode.ILLEGAL_PARAM);
		}
		try {
			projectMapper.deleteByPrimaryKey(projectId);
		} catch (DataAccessException e) {
			LOG.error("Delete project by {#" + projectId + "} appear exception", e);
			throw new ServerException(ErrorCode.DELETE_PROJECT_FAILED);
		}

	}

	@Override
	public void updateProject(Project project) {
		if (project == null) {
			LOG.warn("Project is null");
			throw new ServerException(ErrorCode.ILLEGAL_PARAM);
		}

		try {
			projectMapper.updateByPrimaryKeySelective(project);
		} catch (DataAccessException e) {
			LOG.error("Update project appear exception", e);
			throw new ServerException(ErrorCode.UPDATE_PROJECT_FAILED);
		}
	}

	@Override
	public Page<Project> selectProjectBy(int pageNow, int pageSize, Map<String, Object> criteria) {
		Map<String, Object> params = new HashMap<String, Object>();
		Page<Project> page = new Page<Project>(pageNow, pageSize);
		params.put("page", page);
		if (criteria != null) {
			params.putAll(criteria);
		}
		List<Project> list = projectMapper.selectProjectForList(params);
		page.setResult(list);
		return page;
	}

}
