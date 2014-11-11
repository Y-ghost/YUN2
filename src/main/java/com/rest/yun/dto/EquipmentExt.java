package com.rest.yun.dto;

import java.io.Serializable;
import java.util.List;

import com.rest.yun.beans.EquipmentData;
import com.rest.yun.beans.EquipmentStatus;

public class EquipmentExt implements Serializable {

	private static final long serialVersionUID = -9111114856097767106L;

	private int id;
	private String name;
	private String code;
	private int controlHostId;
	private EquipmentStatus equipmentStatus;
	private List<EquipmentData> equipmentData;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public int getControlHostId() {
		return controlHostId;
	}

	public void setControlHostId(int controlHostId) {
		this.controlHostId = controlHostId;
	}

	public EquipmentStatus getEquipmentStatus() {
		return equipmentStatus;
	}

	public void setEquipmentStatus(EquipmentStatus equipmentStatus) {
		this.equipmentStatus = equipmentStatus;
	}

	public List<EquipmentData> getEquipmentData() {
		return equipmentData;
	}

	public void setEquipmentData(List<EquipmentData> equipmentData) {
		this.equipmentData = equipmentData;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("EquipmentExt [id=");
		builder.append(id);
		builder.append(", name=");
		builder.append(name);
		builder.append(", code=");
		builder.append(code);
		builder.append(", controlHostId=");
		builder.append(controlHostId);
		builder.append(", equipmentStatus=");
		builder.append(equipmentStatus);
		builder.append(", equipmentData=");
		builder.append(equipmentData);
		builder.append("]");
		return builder.toString();
	}

}