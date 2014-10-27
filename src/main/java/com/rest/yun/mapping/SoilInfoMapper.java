package com.rest.yun.mapping;

import com.rest.yun.beans.SoilInfo;

public interface SoilInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(SoilInfo record);

    int insertSelective(SoilInfo record);

    SoilInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(SoilInfo record);

    int updateByPrimaryKey(SoilInfo record);
}