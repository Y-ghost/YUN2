package com.rest.yun.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rest.yun.dto.EquipmentExt;
import com.rest.yun.dto.ResponseWrapper;
import com.rest.yun.service.IEquipmentService;


@Controller
@RequestMapping("/equipment")
public class EquipmentController {
	@Autowired
	private IEquipmentService equipmentService;
	
	/**
	 * @Title:       selectEquipmentExt
	 * @author:      杨贵松
	 * @time         2014年11月6日 上午12:08:14
	 * @Description: 查询实时现场数据
	 * @return       ResponseWrapper
	 * @throws
	 */
	@RequestMapping(value="/selectEquipmentExt" , method = RequestMethod.GET)
	@ResponseBody
	public ResponseWrapper selectEquipmentExt(@RequestParam Integer pId) {
		List<EquipmentExt> list = equipmentService.selectEquipmentExt(pId);
		return new ResponseWrapper(list);
	}

}
