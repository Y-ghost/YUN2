package com.rest.yun.beans;

import java.util.Date;

public class SoilInfo {
    private Integer id;

    private String soiltype;

    private Float soilweight;

    private Float soilwater;

    private Float parametera;

    private Float parameterb;

    private Float parameterc;

    private Float parameterd;

    private String province;

    private String city;

    private String county;

    private String address;

    private Date createtime;

    private Integer createuser;

    private Date modifytime;

    private Integer modifyuser;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSoiltype() {
        return soiltype;
    }

    public void setSoiltype(String soiltype) {
        this.soiltype = soiltype == null ? null : soiltype.trim();
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

    public Float getParametera() {
        return parametera;
    }

    public void setParametera(Float parametera) {
        this.parametera = parametera;
    }

    public Float getParameterb() {
        return parameterb;
    }

    public void setParameterb(Float parameterb) {
        this.parameterb = parameterb;
    }

    public Float getParameterc() {
        return parameterc;
    }

    public void setParameterc(Float parameterc) {
        this.parameterc = parameterc;
    }

    public Float getParameterd() {
        return parameterd;
    }

    public void setParameterd(Float parameterd) {
        this.parameterd = parameterd;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province == null ? null : province.trim();
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city == null ? null : city.trim();
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county == null ? null : county.trim();
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public Integer getCreateuser() {
        return createuser;
    }

    public void setCreateuser(Integer createuser) {
        this.createuser = createuser;
    }

    public Date getModifytime() {
        return modifytime;
    }

    public void setModifytime(Date modifytime) {
        this.modifytime = modifytime;
    }

    public Integer getModifyuser() {
        return modifyuser;
    }

    public void setModifyuser(Integer modifyuser) {
        this.modifyuser = modifyuser;
    }
}