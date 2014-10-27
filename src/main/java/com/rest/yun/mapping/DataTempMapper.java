package com.rest.yun.mapping;

import com.rest.yun.beans.DataTemp;

public interface DataTempMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(DataTemp record);

    int insertSelective(DataTemp record);

    DataTemp selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(DataTemp record);

    int updateByPrimaryKey(DataTemp record);
}