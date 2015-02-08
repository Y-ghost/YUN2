package com.rest.yun.mapping;

import java.util.List;

import com.rest.yun.beans.PlantsExp;

public interface PlantsExpMapper {
    int deleteByPrimaryKey(Integer id);

    int insertSelective(PlantsExp record);

    PlantsExp selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(PlantsExp record);

    int updateByPrimaryKey(PlantsExp record);

    /**
     * @Title:       save
     * @author:      杨贵松
     * @time         2014年12月22日 下午3:17:01
     * @Description: 保存植物周期数据
     * @return       void
     * @throws
     */
	void save(List<PlantsExp> list);
}