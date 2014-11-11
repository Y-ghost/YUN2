package com.rest.yun.service;

import java.util.List;
import java.util.Map;

import com.rest.yun.beans.Equipment;
import com.rest.yun.dto.EquipmentExt;
import com.rest.yun.dto.Page;

public interface IEquipmentService {

	/**
	 * @Title: selectEquipmentExt
	 * @author: 杨贵松
	 * @time 2014年11月6日 上午12:19:31
	 * @Description: 查询节点实时数据信息
	 * @return List<EquipmentExt>
	 * @throws
	 */
	List<EquipmentExt> selectEquipmentExt(Integer pId);

	/**
	 * @Title: openEquipments
	 * @author: 杨贵松
	 * @time 2014年11月6日 下午11:37:55
	 * @Description: 开启灌溉
	 * @return boolean
	 * @throws
	 */
	boolean openEquipments(Integer optionType, String id);

	/**
	 * 分页查询节点列表
	 * 
	 * @param pageNow
	 * @param pageSize
	 * @param criteria
	 * @return
	 */
	Page<Equipment> selectEqtForList(int pageNow, int pageSize, Map<String, Object> criteria);

}