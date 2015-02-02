package com.rest.yun.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.rest.yun.beans.Equipment;
import com.rest.yun.beans.EquipmentData;
import com.rest.yun.beans.SensorInfo;
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
	List<EquipmentExt<EquipmentData>> selectEquipmentExt(Integer pId);

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

	/**
	 * 查询节点的详细信息
	 * 
	 * @param eqtId
	 * @return
	 */
	Equipment getEquipmentById(int eqtId);

	/**
	 * 更新节点的信息
	 * 
	 * @param equipment
	 */
	void updateEquipment(Equipment equipment, int userId);

	/**
	 * 删除节点信息
	 * 
	 * @param eqtId
	 */
	void deleteEquipment(int eqtId);

	/**
	 * @Title:       searchEquipment
	 * @author:      杨贵松
	 * @time         2014年11月24日 下午11:25:04
	 * @Description: 
	 * @return       List<EquipmentExt<SensorInfo>>
	 * @throws
	 */
	List<EquipmentExt<SensorInfo>> searchEquipment(Integer pId);

	/**
	 * @Title:       save
	 * @author:      杨贵松
	 * @time         2014年11月26日 下午12:06:21
	 * @Description: 注册节点
	 * @return       void
	 * @throws
	 */
	void save(List<EquipmentExt<SensorInfo>> list, HttpSession session);

	/**
	 * @Title:       selectEquipments
	 * @author:      杨贵松
	 * @time         2014年12月5日 下午10:10:41
	 * @Description: 查询节点详细信息
	 * @return       List<EquipmentExt<SensorInfo>>
	 * @throws
	 */
	List<EquipmentExt<SensorInfo>> selectEquipments(Integer pId);

	/**
	 * @return 
	 * @Title:       updateList
	 * @author:      杨贵松
	 * @time         2014年12月28日 下午4:42:50
	 * @Description: 批量设置节点及传感器信息
	 * @return       String
	 * @throws
	 */
	String updateList(List<Equipment> list, HttpSession session);

	/**
	 * @return 
	 * @Title:       setListModel
	 * @author:      杨贵松
	 * @time         2015年1月31日 下午11:40:00
	 * @Description: 设置多节点模式
	 * @return       boolean
	 * @throws
	 */
	boolean setListModel(List<Equipment> list, HttpSession session);

	/**
	 * @Title:       setAutoParam
	 * @author:      杨贵松
	 * @time         2015年2月1日 下午8:44:45
	 * @Description: 设置多借点自控参数
	 * @return       void
	 * @throws
	 */
	boolean setAutoParam(List<Equipment> list, HttpSession session);

	/**
	 * @Title:       setTimeLen
	 * @author:      杨贵松
	 * @time         2015年2月2日 上午12:27:08
	 * @Description: 设置多节点时段
	 * @return       void
	 * @throws
	 */
	boolean setTimeLen(List<Equipment> list, HttpSession session);

}
