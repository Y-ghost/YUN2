package com.rest.yun.mapping;

import com.rest.yun.beans.PlantsExp;

public interface PlantsExpMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(PlantsExp record);

    int insertSelective(PlantsExp record);

    PlantsExp selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(PlantsExp record);

    int updateByPrimaryKey(PlantsExp record);
}