package com.rest.yun.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rest.yun.beans.Project;
import com.rest.yun.constants.Constants;
import com.rest.yun.dto.Page;
import com.rest.yun.dto.ResponseWrapper;
import com.rest.yun.service.IProjectService;
import com.rest.yun.util.CommonUtiles;
import com.rest.yun.util.JSONConver;

@Controller
@RequestMapping("/project")
public class ProjectController {

	@Autowired
	private IProjectService projectService;

	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public ResponseWrapper save(@RequestBody Project project) {
		projectService.saveProject(project);
		return new ResponseWrapper(true);
	}

	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public ResponseWrapper selectProjects(@RequestParam(required = false, defaultValue = "1") Integer pageNow,
			@RequestParam(required = false, defaultValue = "10") Integer pageSize, String criteria) {

		Map<String, Object> criteriaMap = null;

		if (!StringUtils.isEmpty(criteria)) {
			criteriaMap = JSONConver.conver(criteria, Map.class);
			// 处理中文乱码
			if (criteriaMap.containsKey(Constants.PROVINCE)) {
				String province = (String) criteriaMap.get(Constants.PROVINCE);
				province = CommonUtiles.decodeUrl(province);
				criteriaMap.put(Constants.PROVINCE, province);
			}

			if (criteriaMap.containsKey(Constants.CITY)) {
				String city = (String) criteriaMap.get(Constants.CITY);
				city = CommonUtiles.decodeUrl(city);
				criteriaMap.put(Constants.CITY, city);
			}
		}

		Page<Project> page = projectService.selectProjectBy(pageNow, pageSize, criteriaMap);

		return new ResponseWrapper(page);
	}

	@RequestMapping(value = "{projectId}", method = RequestMethod.GET)
	@ResponseBody
	public ResponseWrapper detailProject(@PathVariable int projectId) {
		Project project = projectService.getProjectById(projectId);
		return new ResponseWrapper(project);
	}

	@RequestMapping(method = RequestMethod.PUT)
	@ResponseBody
	public ResponseWrapper update(@RequestBody Project project) {
		projectService.updateProject(project);
		return new ResponseWrapper(true);
	}

	@RequestMapping(value = "{projectId}", method = RequestMethod.DELETE)
	@ResponseBody
	public ResponseWrapper deleteProject(@PathVariable int projectId) {
		projectService.deleteProject(projectId);
		return new ResponseWrapper(true);
	}
}