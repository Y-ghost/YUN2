package com.rest.yun.service.Impl;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.rest.yun.beans.PlantsInfo;
import com.rest.yun.exception.ErrorCode;
import com.rest.yun.exception.ServerException;
import com.rest.yun.mapping.PlantsInfoMapper;
import com.rest.yun.service.IPlantsInfoService;

@Service
public class PlantsInfoServiceImpl implements IPlantsInfoService {
	private final static Logger LOG = LoggerFactory.getLogger(PlantsInfoServiceImpl.class);

	@Autowired
	private PlantsInfoMapper plantsInfoMapper;

	/**
	 * @Title:       selectPlantsInfo
	 * @author:      杨贵松
	 * @time         2014年12月5日 下午11:47:03
	 * @Description: 查询植物列表
	 * @throws
	 */
	@Override
	public List<PlantsInfo> selectPlantsInfo() {
		List<PlantsInfo> list = new ArrayList<PlantsInfo>();
		try {
			list = plantsInfoMapper.selectPlantsInfo();
		} catch (DataAccessException e) {
			LOG.error("查询植物信息失败", e);
			throw new ServerException(ErrorCode.ILLEGAL_PARAM);
		}
		return list;
	}
}
