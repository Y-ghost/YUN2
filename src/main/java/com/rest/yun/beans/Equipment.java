package com.rest.yun.beans;

import java.util.Date;

public class Equipment {
    private Integer id;

    private String name;

    private Integer controlhostid;

    private String code;

    private Integer irrigationtype;

    private Float soilweight;

    private Float soilwater;

    private Double area;

    private String plantsname;

    private Integer rootdepth;

    private Float humidityup;

    private Float humiditydown;

    private Float temperatureup;

    private Float temperaturedown;

    private String week;

    private Date timeonestart;

    private Date timeoneend;

    private Date timetwostart;

    private Date timetwoend;

    private Date timethreestart;

    private Date timethreeend;

    private Integer fowparameter;

    private Integer createuser;

    private Date createtime;

    private Integer modifyuser;

    private Date modifytime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public Integer getControlhostid() {
        return controlhostid;
    }

    public void setControlhostid(Integer controlhostid) {
        this.controlhostid = controlhostid;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code == null ? null : code.trim();
    }

    public Integer getIrrigationtype() {
        return irrigationtype;
    }

    public void setIrrigationtype(Integer irrigationtype) {
        this.irrigationtype = irrigationtype;
    }

    public Float getSoilweight() {
        return soilweight;
    }

    public void setSoilweight(Float soilweight) {
        this.soilweight = soilweight;
    }

    public Float getSoilwater() {
        return soilwater;
    }

    public void setSoilwater(Float soilwater) {
        this.soilwater = soilwater;
    }

    public Double getArea() {
        return area;
    }

    public void setArea(Double area) {
        this.area = area;
    }

    public String getPlantsname() {
        return plantsname;
    }

    public void setPlantsname(String plantsname) {
        this.plantsname = plantsname == null ? null : plantsname.trim();
    }

    public Integer getRootdepth() {
        return rootdepth;
    }

    public void setRootdepth(Integer rootdepth) {
        this.rootdepth = rootdepth;
    }

    public Float getHumidityup() {
        return humidityup;
    }

    public void setHumidityup(Float humidityup) {
        this.humidityup = humidityup;
    }

    public Float getHumiditydown() {
        return humiditydown;
    }

    public void setHumiditydown(Float humiditydown) {
        this.humiditydown = humiditydown;
    }

    public Float getTemperatureup() {
        return temperatureup;
    }

    public void setTemperatureup(Float temperatureup) {
        this.temperatureup = temperatureup;
    }

    public Float getTemperaturedown() {
        return temperaturedown;
    }

    public void setTemperaturedown(Float temperaturedown) {
        this.temperaturedown = temperaturedown;
    }

    public String getWeek() {
        return week;
    }

    public void setWeek(String week) {
        this.week = week == null ? null : week.trim();
    }

    public Date getTimeonestart() {
        return timeonestart;
    }

    public void setTimeonestart(Date timeonestart) {
        this.timeonestart = timeonestart;
    }

    public Date getTimeoneend() {
        return timeoneend;
    }

    public void setTimeoneend(Date timeoneend) {
        this.timeoneend = timeoneend;
    }

    public Date getTimetwostart() {
        return timetwostart;
    }

    public void setTimetwostart(Date timetwostart) {
        this.timetwostart = timetwostart;
    }

    public Date getTimetwoend() {
        return timetwoend;
    }

    public void setTimetwoend(Date timetwoend) {
        this.timetwoend = timetwoend;
    }

    public Date getTimethreestart() {
        return timethreestart;
    }

    public void setTimethreestart(Date timethreestart) {
        this.timethreestart = timethreestart;
    }

    public Date getTimethreeend() {
        return timethreeend;
    }

    public void setTimethreeend(Date timethreeend) {
        this.timethreeend = timethreeend;
    }

    public Integer getFowparameter() {
        return fowparameter;
    }

    public void setFowparameter(Integer fowparameter) {
        this.fowparameter = fowparameter;
    }

    public Integer getCreateuser() {
        return createuser;
    }

    public void setCreateuser(Integer createuser) {
        this.createuser = createuser;
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public Integer getModifyuser() {
        return modifyuser;
    }

    public void setModifyuser(Integer modifyuser) {
        this.modifyuser = modifyuser;
    }

    public Date getModifytime() {
        return modifytime;
    }

    public void setModifytime(Date modifytime) {
        this.modifytime = modifytime;
    }
}