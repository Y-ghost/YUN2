package com.rest.yun.util.test;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.util.CollectionUtils;

import com.rest.yun.util.CodingFactoryUtil;
import com.rest.yun.util.CommonUtiles;



public class Test {
	private static final DateFormat FORMATTER = new SimpleDateFormat("yyyy-MM-dd");
	
	public static void main(String[] args) throws ParseException {
		CodingFactoryUtil codingFactory = new CodingFactoryUtil();
		byte[] eData = codingFactory.longToByte(10000L);
		double[][] val = {{17.0,1.0},{22.0,1.5},{1.0,2.0},{1.0,1.0}};
		float[] tmp = CommonUtiles.caculate(val);
		System.out.println(tmp[0]);
	}
	
	 public static int daysBetween(Date smdate,Date bdate) throws ParseException    
	    {    
	        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");  
	        smdate=sdf.parse(sdf.format(smdate));  
	        bdate=sdf.parse(sdf.format(bdate));  
	        Calendar cal = Calendar.getInstance();    
	        cal.setTime(smdate);    
	        long time1 = cal.getTimeInMillis();                 
	        cal.setTime(bdate);    
	        long time2 = cal.getTimeInMillis();         
	        long between_days=(time2-time1)/(1000*3600*24);  
	            
	       return Integer.parseInt(String.valueOf(between_days));           
	    }    
	
	public static float[] function(float x,float y){
		float[] param = new float[4];
		
		y = (float) (param[0]*Math.pow(x,3) + param[1]*Math.pow(x,2)+param[2]*Math.pow(x,1) + param[3]);
		
		return param;
	}
	
	/**
	 * @Title: 				byteMerger 
	 * @author 				杨贵松
	 * @date 				2014年7月3日 下午12:19:23
	 * @Description: 		java 合并两个byte数组  
	 * @param byte_1
	 * @param byte_2
	 * @return 
	 * byte[] 				返回
	 */
    public static byte[] byteMerger(byte[] byte_1, byte[] byte_2){  
        byte[] byte_3 = new byte[byte_1.length+byte_2.length];  
        System.arraycopy(byte_1, 0, byte_3, 0, byte_1.length);  
        System.arraycopy(byte_2, 0, byte_3, byte_1.length, byte_2.length);  
        return byte_3;  
    }  
    
    public static long unsigned4BytesToInt(byte[] buf) {  
        int firstByte = 0;  
        int secondByte = 0;  
        int thirdByte = 0;  
        int fourthByte = 0;  
        int index =0;  
        firstByte = (0x000000FF & buf[index]);  
        secondByte = (0x000000FF & buf[index + 1]);  
        thirdByte = (0x000000FF & buf[index + 2]);  
        fourthByte = (0x000000FF & buf[index + 3]);  
        index = index + 4;  
        return (firstByte << 24 | secondByte << 16 | thirdByte << 8 | fourthByte) & 0xFFFFFFFFL;  
    }
    
	/** 
	 * @Title: 				longToByte 
	 * @author 				杨贵松
	 * @date 				2014年7月3日 下午12:06:14
	 * @Description: 		倒序转换
	 * @param number
	 * @return 
	 * byte[] 				返回 
	 */
	public static byte[] longToByte(long number) { 
		long temp = number; 
		byte[] b = new byte[4]; 
		for (int i = 3; i >=0 ; i--) { 
			b[i] = new Long(temp & 0xff).byteValue();// 将最低位保存在最低位 
			temp = temp >> 8; // 向右移8位 
		} 
		return b; 
	} 
	
	/**
	 * @Title: 				toByteArray 
	 * @author 				杨贵松
	 * @date 				2014年7月3日 下午12:19:32
	 * @Description: 		正序转换
	 * @param number
	 * @return 
	 * byte[] 				返回
	 */
	public static byte[] toByteArray(long number) {
		long temp = number;
		byte[] b = new byte[4];
		for (int i = b.length - 1; i > -1; i--) {
			b[i] = new Long(temp & 0xff).byteValue();
			temp = temp >> 8;
		}
		return b;
	}

	public static long toLong(byte[] b) {
		long l = 0;
		l = b[0];
		l |= ((long) b[1] << 8);
		l |= ((long) b[2] << 16);
		l |= ((long) b[3] << 24);
		l |= ((long) b[4] << 32);
		l |= ((long) b[5] << 40);
		l |= ((long) b[6] << 48);
		l |= ((long) b[7] << 56);
		return l;
	}
	
	private static List<Date> printDay(Date start, Date end) {
		List<Date> list = new ArrayList<Date>();
		Calendar startDay = Calendar.getInstance();
		Calendar endDay = Calendar.getInstance();

		startDay.setTime(start);
		endDay.setTime(end);
		// 给出的日期开始日比终了日大则不执行打印
		if (startDay.compareTo(endDay) > 0) {
			return list;
		}
		// 给出的日期开始日与终了日相同则打印开始日期后终止
		if (startDay.compareTo(endDay) == 0) {
			list.add(start);
			return list;
		}
		// 现在打印中的日期
		Calendar currentPrintDay = startDay;
		while (true) {
			// 打印日期
			list.add(currentPrintDay.getTime());
			// 日期加一
			currentPrintDay.add(Calendar.DATE, 1);
			// 日期加一后判断是否达到终了日，达到则终止打印
			if (currentPrintDay.compareTo(endDay) == 0) {
				list.add(currentPrintDay.getTime());
				break;
			}
		}
		return list;
	}
}
