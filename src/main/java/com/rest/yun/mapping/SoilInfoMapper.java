package com.rest.yun.mapping;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.rest.yun.beans.SoilInfo;

public interface SoilInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(SoilInfo record);

    SoilInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(SoilInfo record);

    int updateByPrimaryKey(SoilInfo record);

    /**
     * @Title:       selectSoilInfo
     * @author:      杨贵松
     * @time         2014年12月5日 下午11:59:04
     * @Description: 查询土壤列表
     * @return       List<SoilInfo>
     * @throws
     */
	List<SoilInfo> selectSoilInfo();

	/**
	 * @Title:       validSoilName
	 * @author:      杨贵松
	 * @time         2014年12月6日 下午9:47:22
	 * @Description: 验证土壤名是否存在
	 * @return       boolean
	 * @throws
	 */
	boolean validSoilName(@Param("soiltype") String soiltype, @Param("soilId") int soilId);

	/**
	 * @Title:       save
	 * @author:      杨贵松
	 * @time         2014年12月15日 下午9:56:21
	 * @Description: 添加土壤信息
	 * @return       void
	 * @throws
	 */
	void save(SoilInfo soil);
}