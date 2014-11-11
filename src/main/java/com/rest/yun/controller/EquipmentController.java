package com.rest.yun.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rest.yun.beans.Equipment;
import com.rest.yun.dto.EquipmentExt;
import com.rest.yun.dto.Page;
import com.rest.yun.dto.ResponseWrapper;
import com.rest.yun.service.IEquipmentService;
import com.rest.yun.util.JSONConver;

@Controller
@RequestMapping("/equipment")
public class EquipmentController {
	@Autowired
	private IEquipmentService equipmentService;

	/**
	 * @Title: selectEquipmentExt
	 * @author: 杨贵松
	 * @time 2014年11月6日 上午12:08:14
	 * @Description: 查询实时现场数据
	 * @return ResponseWrapper
	 * @throws
	 */
	@RequestMapping(value = "/selectEquipmentExt", method = RequestMethod.GET)
	@ResponseBody
	public ResponseWrapper selectEquipmentExt(@RequestParam Integer pId) {
		List<EquipmentExt> list = equipmentService.selectEquipmentExt(pId);
		return new ResponseWrapper(list);
	}

	/**
	 * @Title: openEquipments
	 * @author: 杨贵松
	 * @time 2014年11月6日 下午11:35:40
	 * @Description: 开启灌溉
	 *               optionType为判断开启还是关闭操作，optionType=0表示开启，optionType=1表示关闭
	 * @return ResponseWrapper
	 * @throws
	 */
	@RequestMapping(value = "/openOrCloseEquipments", method = RequestMethod.GET)
	@ResponseBody
	public ResponseWrapper openOrCloseEquipments(@RequestParam Integer optionType, @RequestParam String id) {
		boolean flag = equipmentService.openEquipments(optionType, id);
		return new ResponseWrapper(flag);
	}

	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public ResponseWrapper selectProjects(@RequestParam(required = false, defaultValue = "1") Integer pageNow,
			@RequestParam(required = false, defaultValue = "10") Integer pageSize, String criteria) {

		Map<String, Object> criteriaMap = null;

		if (!StringUtils.isEmpty(criteria)) {
			criteriaMap = JSONConver.conver(criteria, Map.class);
		}

		Page<Equipment> page = equipmentService.selectEqtForList(pageNow, pageSize, criteriaMap);

		return new ResponseWrapper(page);
	}
}
