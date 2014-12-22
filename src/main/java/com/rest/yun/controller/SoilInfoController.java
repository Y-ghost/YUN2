package com.rest.yun.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rest.yun.beans.SoilInfo;
import com.rest.yun.dto.ResponseWrapper;
import com.rest.yun.listener.Login;
import com.rest.yun.service.ISoilInfoService;
import com.rest.yun.util.CommonUtiles;

@Controller
@RequestMapping("/soil")
public class SoilInfoController {
	@Autowired
	private ISoilInfoService soilInfoService;

	/**
	 * @Title:       selectEquipments
	 * @author:      杨贵松
	 * @time         2014年12月5日 下午11:53:18
	 * @Description: 查询土壤列表
	 * @return       ResponseWrapper
	 * @throws
	 */
	@Login
	@RequestMapping(value = "/selectSoilInfo", method = RequestMethod.GET)
	@ResponseBody
	public ResponseWrapper selectEquipments() {
		List<SoilInfo> list = soilInfoService.selectSoilInfo();
		return new ResponseWrapper(list);
	}

	/**
	 * @Title:       validProjectName
	 * @author:      杨贵松
	 * @time         2014年12月6日 下午9:43:54
	 * @Description: 验证土壤名是否存在
	 * @return       ResponseWrapper
	 * @throws
	 */
	@Login
	@RequestMapping(value = "validName", method = RequestMethod.GET)
	@ResponseBody
	public ResponseWrapper validName(@RequestParam String soiltype, @RequestParam(required = false, defaultValue = "0") int soilId) {
		boolean result = soilInfoService.validSoilName(CommonUtiles.fixedChinaCode(soiltype), soilId);
		return new ResponseWrapper(result);
	}
	
	/**
	 * @Title:       save
	 * @author:      杨贵松
	 * @time         2014年12月5日 下午11:54:59
	 * @Description: 添加土壤信息
	 * @return       ResponseWrapper
	 * @throws
	 */
	@Login
	@RequestMapping(value="/save",method = RequestMethod.POST)
	@ResponseBody
	public ResponseWrapper save(@RequestBody SoilInfo soil, HttpSession session) {
		//....
		soilInfoService.save(soil,session);
		return new ResponseWrapper(true);
	}
}
