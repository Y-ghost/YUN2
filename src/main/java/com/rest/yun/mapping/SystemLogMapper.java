package com.rest.yun.mapping;

import java.util.List;

import com.rest.yun.beans.SystemLog;

public interface SystemLogMapper {
    int deleteByPrimaryKey(Integer id);

//    记录日志
    int insert(List<SystemLog> sysLogList);

    int insertSelective(SystemLog record);

    SystemLog selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(SystemLog record);

    int updateByPrimaryKey(SystemLog record);
}