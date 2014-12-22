package com.rest.yun.service;

import java.util.List;

import javax.servlet.http.HttpSession;

import com.rest.yun.beans.SoilInfo;


public interface ISoilInfoService {

	List<SoilInfo> selectSoilInfo();

	boolean validSoilName(String soiltype, int soilId);

	void save(SoilInfo soil, HttpSession session);

}
