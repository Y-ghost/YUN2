package com.rest.yun.util;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @project: yun
 * @Title: CommonUtiles.java
 * @Package com.rest.yun.util
 * @Description: 通用公共方法封装类
 * @author 杨贵松
 * @date 2014年1月22日 下午11:56:34
 * @version V1.0
 */
public class CommonUtiles {

	public final static String ISO_8859_1 = "ISO-8859-1";
	public final static String UTF_8 = "UTF-8";

	/**
	 * @Title: getSystemDateTime
	 * @author 杨贵松
	 * @date 2014年1月22日 下午11:53:47
	 * @Description: 获得系统时间
	 * @return Date 返回
	 * @throws ParseException
	 */
	public static Date getSystemDateTime() throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date time = sdf.parse(sdf.format(new Date()));
		return time;
	}

	/**
	 * @Title: getLastDate
	 * @author 杨贵松
	 * @date 2014年11月01日 下午11:17:35
	 * @Description: 获取比当前时间早几秒的时间
	 * @return
	 * @throws ParseException
	 *             Date 返回
	 */
	public static Date getLastDate(int num) throws ParseException {
		long t = System.currentTimeMillis();
		Date date = new Date(t + num * 1000);
		return date;
	}

	/**
	 * Decode URL by UTF-8
	 * 
	 * @param value
	 * @return
	 */
	public static String decodeUrl(String value) {
		try {
			value = URLDecoder.decode(value, UTF_8);
		} catch (Exception e) {
		}
		return value;
	}

	public static String fixedChinaCode(String value) {
		try {
			value = new String(value.getBytes(ISO_8859_1), UTF_8);
		} catch (UnsupportedEncodingException e) {
		}
		return value;
	}
}
