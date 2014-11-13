package com.rest.yun.mapping;

import java.util.List;
import java.util.Map;

import com.rest.yun.beans.User;

public interface UserMapper {
	int deleteByPrimaryKey(Integer id);

	int insert(User record);

	int insertSelective(User record);

	User selectByPrimaryKey(Integer id);

	int updateByPrimaryKeySelective(User record);

	int updateByPrimaryKey(User record);

	/**
	 * @Title: selectUserByHostCode
	 * @author: 杨贵松
	 * @time 2014年11月4日 上午4:36:28
	 * @Description: 根据主机地址查询用户信息
	 * @return List<User>
	 * @throws
	 */
	List<User> selectUserByHostCode(String hostCode);

	/**
	 * @Title: saveUser
	 * @author: 杨贵松
	 * @time 2014年11月9日 上午11:32:52
	 * @Description: 用户注册
	 * @return void
	 * @throws
	 */
	void saveUser(User user);

	List<User> selectUserForList(Map<String, Object> params);
}