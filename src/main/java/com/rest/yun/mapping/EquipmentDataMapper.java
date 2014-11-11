package com.rest.yun.mapping;

import java.util.List;

import com.rest.yun.beans.EquipmentData;

public interface EquipmentDataMapper {
    int deleteByPrimaryKey(Integer id);
//批量添加传感器数据
    int insert(List<EquipmentData> listData);

    int insertSelective(EquipmentData record);
//根据传感器id查询最新的一条数据 
    EquipmentData selectByPrimaryKey(Integer sId);

    int updateByPrimaryKeySelective(EquipmentData record);

    int updateByPrimaryKey(EquipmentData record);
}