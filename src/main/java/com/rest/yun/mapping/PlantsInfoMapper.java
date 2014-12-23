package com.rest.yun.mapping;

import java.util.List;

import com.rest.yun.beans.PlantsInfo;

public interface PlantsInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(PlantsInfo record);

    PlantsInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(PlantsInfo record);

    int updateByPrimaryKey(PlantsInfo record);
    
    /**
     * @Title:       selectPlantsInfo
     * @author:      杨贵松
     * @time         2014年12月5日 下午11:51:32
     * @Description: 查询植物列表
     * @return       List<PlantsInfo>
     * @throws
     */
    List<PlantsInfo> selectPlantsInfo();

    /**
     * @Title:       save
     * @author:      杨贵松
     * @time         2014年12月22日 下午3:10:43
     * @Description: 添加植物
     * @return       int
     * @throws
     */
	int save(PlantsInfo plants);
}