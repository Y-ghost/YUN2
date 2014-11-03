package com.rest.yun.mapping;

import com.rest.yun.beans.ControlHost;

public interface ControlHostMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(ControlHost record);

    int insertSelective(ControlHost record);

    ControlHost selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ControlHost record);

    int updateByPrimaryKey(ControlHost record);

	/**
	 * @Title:       selectByCode
	 * @author:      杨贵松
	 * @time         2014年11月4日 上午4:30:28
	 * @Description: 根据通讯地址查询主机信息
	 * @return       ControlHost
	 * @throws
	 */
	ControlHost selectByCode(String code);
}