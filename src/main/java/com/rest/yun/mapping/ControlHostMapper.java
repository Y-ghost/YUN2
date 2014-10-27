package com.rest.yun.mapping;

import com.rest.yun.beans.ControlHost;

public interface ControlHostMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(ControlHost record);

    int insertSelective(ControlHost record);

    ControlHost selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ControlHost record);

    int updateByPrimaryKey(ControlHost record);
}