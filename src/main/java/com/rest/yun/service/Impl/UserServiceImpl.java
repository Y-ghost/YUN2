package com.rest.yun.service.Impl;

import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.rest.yun.beans.User;
import com.rest.yun.constants.Constants;
import com.rest.yun.dto.Page;
import com.rest.yun.exception.ErrorCode;
import com.rest.yun.exception.ServerException;
import com.rest.yun.mapping.UserMapper;
import com.rest.yun.service.IUserService;
import com.rest.yun.util.CommonUtiles;
import com.rest.yun.util.MD5;

@Service
public class UserServiceImpl implements IUserService {
	private final static Logger LOG = LoggerFactory.getLogger(UserServiceImpl.class);

	@Autowired
	private UserMapper userMapper;

	/**
	 * @Title: saveUser
	 * @author: 杨贵松
	 * @time 2014年11月9日 上午11:30:50
	 * @Description: 用户注册
	 */
	@Override
	public boolean saveUser(User user) {
		boolean flag = false;
		Date date = null;
		try {
			date = CommonUtiles.getSystemDateTime();
			user.setPassword(MD5.getMD5Str(user.getPassword().trim()));
			user.setCreatetime(date);
			user.setModifytime(date);
			user.setRole(1);
			user.setRightcontent("01");
			userMapper.saveUser(user);
			flag = true;
		} catch (DataAccessException e) {
			flag = false;
			LOG.error("register a User exception", e);
			throw new ServerException(ErrorCode.REGISTER_USER_FAILED);
		} catch (ParseException e) {
			flag = false;
			LOG.error("get system time exception", e);
			throw new ServerException(ErrorCode.ILLEGAL_PARAM);
		}
		return flag;
	}

	@Override
	public void updateUser(User user, int modifierId) {
		if (user == null) {
			LOG.warn("Invalid user information when updating user");
			throw new ServerException(ErrorCode.ILLEGAL_PARAM);
		}
		try {
			user.setModifyuser(modifierId);
			user.setModifytime(new Date());
			userMapper.updateByPrimaryKeySelective(user);
		} catch (DataAccessException e) {
			LOG.error("Updating a User exception", e);
			throw new ServerException(ErrorCode.UPDATE_USER_FAILED);
		}

	}

	@Override
	public void deleteUser(int userId) {
		if (userId == 0) {
			LOG.warn("Invalid user id");
			throw new ServerException(ErrorCode.ILLEGAL_PARAM);
		}

		try {
			userMapper.deleteByPrimaryKey(userId);
		} catch (DataAccessException e) {
			LOG.error("Delete a User exception", e);
			throw new ServerException(ErrorCode.DELETE_USER_FAILED);
		}

	}

	@Override
	public User getUserById(int userId) {
		return userMapper.selectByPrimaryKey(userId);
	}

	@Override
	public Page<User> selectUsersBy(int pageNow, int pageSize, Map<String, Object> criteria) {
		Map<String, Object> params = new HashMap<String, Object>();
		Page<User> page = new Page<User>(pageNow, pageSize);
		params.put(Constants.PAGE, page);
		if (criteria != null) {
			params.putAll(criteria);
		}
		try {
			List<User> list = userMapper.selectUserForList(params);
			page.setResult(list);
		} catch (DataAccessException e) {
			LOG.error("Select users exception", e);
			throw new ServerException(ErrorCode.SELECT_USERS_LIST_FAILED);
		}

		return page;
	}

}
