package com.rest.yun.mapping;

import com.rest.yun.beans.EquipmentStatus;

public interface EquipmentStatusMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(EquipmentStatus record);

    int insertSelective(EquipmentStatus record);

    EquipmentStatus selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(EquipmentStatus record);

    int updateByPrimaryKey(EquipmentStatus record);
}