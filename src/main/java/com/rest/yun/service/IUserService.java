package com.rest.yun.service;

import java.util.Map;

import com.rest.yun.beans.User;
import com.rest.yun.dto.Page;

public interface IUserService {

	/**
	 * @Title: saveUser
	 * @author: 杨贵松
	 * @time 2014年11月9日 上午11:30:28
	 * @Description: 用户注册
	 * @return boolean
	 * @throws
	 */
	boolean saveUser(User user);

	void updateUser(User user, int modifierId);

	void deleteUser(int userId);

	User getUserById(int userId);

	Page<User> selectUsersBy(int pageNow, int pageSize, Map<String, Object> criteria);

}
