package com.rest.yun.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rest.yun.beans.User;
import com.rest.yun.dto.ResponseWrapper;
import com.rest.yun.service.IUserService;

@Controller
@RequestMapping("/User")
public class UserController {

	@Autowired
	private IUserService userService;

	/**
	 * @Title:       save
	 * @author:      杨贵松
	 * @time         2014年11月8日 下午9:49:15
	 * @Description: 用户注册
	 * @return       ResponseWrapper
	 * @throws
	 */
	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public ResponseWrapper save(@RequestBody User user) {
		boolean flag = userService.saveUser(user);
		return new ResponseWrapper(flag);
	}
}
