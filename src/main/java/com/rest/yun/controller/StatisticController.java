package com.rest.yun.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rest.yun.beans.EquipmentData;
import com.rest.yun.beans.EquipmentStatus;
import com.rest.yun.dto.EquipmentDataExt;
import com.rest.yun.dto.EquipmentExt;
import com.rest.yun.dto.ResponseWrapper;
import com.rest.yun.listener.Login;
import com.rest.yun.service.IStatisticService;

@Controller
@RequestMapping("/statistic")
public class StatisticController {

	@Autowired
	private IStatisticService statisticService;

	/**
	 * @Title:       waterList
	 * @author:      杨贵松
	 * @time         2015年1月14日 上午4:51:48
	 * @Description: 统计灌溉用水量
	 * @return       ResponseWrapper
	 * @throws
	 */
	@Login
	@RequestMapping(value="waterList",method = RequestMethod.GET)
	@ResponseBody
	public ResponseWrapper waterList(@RequestParam Integer pId, @RequestParam Integer eId,@RequestParam Date startDate, @RequestParam Date endDate) {
		List<EquipmentExt<EquipmentStatus>> list = statisticService.waterList(pId,eId,startDate, endDate);
		return new ResponseWrapper(list);
	}
	
	/**
	 * @Title:       humidityList
	 * @author:      杨贵松
	 * @time         2015年1月14日 上午4:52:24
	 * @Description: 统计灌区湿度值
	 * @return       ResponseWrapper
	 * @throws
	 */
	@Login
	@RequestMapping(value="humidityList",method = RequestMethod.GET)
	@ResponseBody
	public ResponseWrapper humidityList(@RequestParam Integer pId, @RequestParam Integer eId,@RequestParam Date startDate, @RequestParam Date endDate) {
		List<EquipmentDataExt<EquipmentData>> list = statisticService.humidityList(pId,eId,startDate, endDate);
		return new ResponseWrapper(list);
	}

}
