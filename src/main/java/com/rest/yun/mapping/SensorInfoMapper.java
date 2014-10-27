package com.rest.yun.mapping;

import com.rest.yun.beans.SensorInfo;

public interface SensorInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(SensorInfo record);

    int insertSelective(SensorInfo record);

    SensorInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(SensorInfo record);

    int updateByPrimaryKey(SensorInfo record);
}