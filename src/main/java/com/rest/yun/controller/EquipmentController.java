package com.rest.yun.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rest.yun.beans.Equipment;
import com.rest.yun.beans.EquipmentData;
import com.rest.yun.beans.User;
import com.rest.yun.constants.Constants;
import com.rest.yun.dto.EquipmentExt;
import com.rest.yun.dto.Page;
import com.rest.yun.dto.ResponseWrapper;
import com.rest.yun.listener.Login;
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
	@Login
	@RequestMapping(value = "/selectEquipmentExt", method = RequestMethod.GET)
	@ResponseBody
	public ResponseWrapper selectEquipmentExt(@RequestParam Integer pId) {
		List<EquipmentExt<EquipmentData>> list = equipmentService.selectEquipmentExt(pId);
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
	@Login
	@RequestMapping(value = "/openOrCloseEquipments", method = RequestMethod.GET)
	@ResponseBody
	public ResponseWrapper openOrCloseEquipments(@RequestParam Integer optionType, @RequestParam String id) {
		boolean flag = equipmentService.openEquipments(optionType, id);
		return new ResponseWrapper(flag);
	}
	
	/**
	 * @Title:       searchEquipment
	 * @author:      杨贵松
	 * @time         2014年11月22日 下午3:11:27
	 * @Description: 搜索节点
	 * @return       ResponseWrapper
	 * @throws
	 */
//	@Login
//	@RequestMapping(value = "/searchEquipment", method = RequestMethod.GET)
//	@ResponseBody
//	public ResponseWrapper searchEquipment(@RequestParam Integer pId ) {
//		List<Equipment> flag = equipmentService.searchEquipment(pId);
//		return new ResponseWrapper(flag);
//	}

	@Login
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public ResponseWrapper selectEqts(@RequestParam(required = false, defaultValue = "1") Integer pageNow,
			@RequestParam(required = false, defaultValue = "10") Integer pageSize, String criteria) {

		Map<String, Object> criteriaMap = null;

		if (!StringUtils.isEmpty(criteria)) {
			criteriaMap = JSONConver.conver(criteria, Map.class);
		}

		Page<Equipment> page = equipmentService.selectEqtForList(pageNow, pageSize, criteriaMap);

		return new ResponseWrapper(page);
	}

	/**
	 * @Title: save
	 * @author: 杨贵松
	 * @Description: 添加节点
	 * @return ResponseWrapper
	 * @throws
	 */
	@Login
	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public ResponseWrapper save(@RequestBody Equipment equipment, HttpSession session) {
		// TODO add Save code
		return new ResponseWrapper(true);
	}

	/**
	 * 节点详细信息
	 * 
	 * @param projectId
	 * @return
	 */
	@RequestMapping(value = "{eqtId}", method = RequestMethod.GET)
	@ResponseBody
	public ResponseWrapper detail(@PathVariable int eqtId) {
		Equipment equipment = equipmentService.getEquipmentById(eqtId);
		return new ResponseWrapper(equipment);
	}

	/**
	 * 更新节点
	 * 
	 * @param equipment
	 * @param session
	 * @return
	 */
	@Login
	@RequestMapping(method = RequestMethod.PUT)
	@ResponseBody
	public ResponseWrapper update(@RequestBody Equipment equipment, HttpSession session) {
		User user = (User) session.getAttribute(Constants.USER);
		equipmentService.updateEquipment(equipment, user.getId());
		return new ResponseWrapper(true);
	}

	/**
	 * 删除节点
	 * 
	 * @param eqtId
	 * @return
	 */
	@Login
	@RequestMapping(value = "{eqtId}", method = RequestMethod.DELETE)
	@ResponseBody
	public ResponseWrapper delete(@PathVariable int eqtId) {
		equipmentService.deleteEquipment(eqtId);
		return new ResponseWrapper(true);
	}
}
