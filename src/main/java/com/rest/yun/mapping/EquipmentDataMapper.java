package com.rest.yun.mapping;

import java.util.List;

import com.rest.yun.beans.EquipmentData;

public interface EquipmentDataMapper {
    int deleteByPrimaryKey(Integer id);
//批量添加传感器数据
    int insert(List<EquipmentData> listData);

    int insertSelective(EquipmentData record);

    EquipmentData selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(EquipmentData record);

    int updateByPrimaryKey(EquipmentData record);
}