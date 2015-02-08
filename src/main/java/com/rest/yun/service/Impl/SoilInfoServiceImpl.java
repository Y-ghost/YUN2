package com.rest.yun.service.Impl;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.rest.yun.beans.SoilInfo;
import com.rest.yun.beans.User;
import com.rest.yun.constants.Constants;
import com.rest.yun.exception.ErrorCode;
import com.rest.yun.exception.ServerException;
import com.rest.yun.mapping.SoilInfoMapper;
import com.rest.yun.service.ISoilInfoService;
import com.rest.yun.util.CommonUtiles;

@Service
public class SoilInfoServiceImpl implements ISoilInfoService{
	private final static Logger LOG = LoggerFactory.getLogger(SoilInfoServiceImpl.class);

	@Autowired
	private SoilInfoMapper soilInfoMapper;

	/**
	 * @Title:       selectSoilInfo
	 * @author:      杨贵松
	 * @time         2014年12月5日 下午11:57:53
	 * @Description: 查询土壤信息列表 
	 * @throws
	 */
	@Override
	public List<SoilInfo> selectSoilInfo() {
		List<SoilInfo> list = new ArrayList<SoilInfo>();
		try {
			list = soilInfoMapper.selectSoilInfo();
		} catch (DataAccessException e) {
			LOG.error("查询土壤信息失败", e);
			throw new ServerException(ErrorCode.ILLEGAL_PARAM);
		}
		return list;
	}

	/**
	 * @Title:       validSoilName
	 * @author:      杨贵松
	 * @time         2014年12月6日 下午9:45:47
	 * @Description: 验证土壤名是否存在
	 * @throws
	 */
	@Override
	public boolean validSoilName(String soiltype, int soilId) {
		return soilInfoMapper.validSoilName(soiltype,soilId);
	}

	/**
	 * @Title:       save
	 * @author:      杨贵松
	 * @time         2014年12月15日 下午9:56:33
	 * @Description: 添加土壤信息
	 * @throws
	 */
	@Override
	public void save(SoilInfo soil, HttpSession session) {
		Date date;
		try {
			date = CommonUtiles.getSystemDateTime();
			User user = (User) session.getAttribute(Constants.USER);
			soil.setCreatetime(date);
			soil.setCreateuser(user.getId());
			soil.setModifytime(date);
			soil.setModifyuser(user.getId());
			//通过高斯消元法求a、b、c、d参数值
			double[][] val = {{soil.getOriginalVal1(),soil.getWaterVal1()},{soil.getOriginalVal2(),soil.getWaterVal2()},{soil.getOriginalVal3(),soil.getWaterVal3()},{soil.getOriginalVal4(),soil.getWaterVal4()}};
			float[] tmp = CommonUtiles.caculate(val);
			soil.setParametera(tmp[0]);
			soil.setParameterb(tmp[1]);
			soil.setParameterc(tmp[2]);
			soil.setParameterd(tmp[3]);
			
			soilInfoMapper.save(soil);
		} catch (ParseException e) {
			LOG.error("获取系统时间异常", e);
			throw new ServerException(ErrorCode.ILLEGAL_PARAM);
		} catch (DataAccessException e) {
			LOG.error("添加土壤信息失败", e);
			throw new ServerException(ErrorCode.ILLEGAL_PARAM);
		}
	}
}
