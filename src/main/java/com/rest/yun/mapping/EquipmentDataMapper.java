package com.rest.yun.mapping;

import com.rest.yun.beans.EquipmentData;

public interface EquipmentDataMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(EquipmentData record);

    int insertSelective(EquipmentData record);

    EquipmentData selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(EquipmentData record);

    int updateByPrimaryKey(EquipmentData record);
}