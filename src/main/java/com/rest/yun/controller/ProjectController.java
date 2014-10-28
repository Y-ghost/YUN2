package com.rest.yun.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rest.yun.beans.Project;
import com.rest.yun.dto.Page;
import com.rest.yun.dto.ResponseWrapper;
import com.rest.yun.service.IProjectService;

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
			@RequestParam(required = false, defaultValue = "10") Integer pageSize) {
		Page<Project> page = projectService.selectProjectBy(pageNow, pageSize, null);
		return new ResponseWrapper(page);
	}

}
