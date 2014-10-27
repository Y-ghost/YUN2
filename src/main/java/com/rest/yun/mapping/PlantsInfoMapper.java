package com.rest.yun.mapping;

import com.rest.yun.beans.PlantsInfo;

public interface PlantsInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(PlantsInfo record);

    int insertSelective(PlantsInfo record);

    PlantsInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(PlantsInfo record);

    int updateByPrimaryKey(PlantsInfo record);
}