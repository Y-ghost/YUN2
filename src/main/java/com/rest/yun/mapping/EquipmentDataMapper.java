package com.rest.yun.mapping;

import java.util.List;

import com.rest.yun.beans.EquipmentData;

public interface EquipmentDataMapper {
    int deleteByPrimaryKey(Integer id) throws Exception;
//批量添加传感器数据
    int insert(List<EquipmentData> listData) throws Exception;

    int insertSelective(EquipmentData record) throws Exception;
//根据传感器id查询最新的一条数据 
    EquipmentData selectByPrimaryKey(Integer sId) throws Exception;

    int updateByPrimaryKeySelective(EquipmentData record) throws Exception;

    int updateByPrimaryKey(EquipmentData record) throws Exception;
}