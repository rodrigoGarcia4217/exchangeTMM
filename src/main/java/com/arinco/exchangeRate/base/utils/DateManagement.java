package com.arinco.exchangeRate.base.utils;

import java.text.SimpleDateFormat;

public class DateManagement {

	public static String today(String separator) {
		java.util.Date date = new java.util.Date(System.currentTimeMillis());
		SimpleDateFormat formatter;
		switch(separator) {
		case "/":
			formatter = new SimpleDateFormat("dd/MM/yyyy");
			return formatter.format(date);
		case ".":
			formatter = new SimpleDateFormat("dd.MM.yyyy");
			return formatter.format(date);
		case "-":
			formatter = new SimpleDateFormat("dd-MM-yyyy");
			return formatter.format(date);
		case "ci":
			formatter = new SimpleDateFormat("yyyy-MM-dd");
			return formatter.format(date);
		default:
			return date.toString();
		}
	}

	public static java.sql.Date convert(java.util.Date uDate) {
        java.sql.Date sDate = new java.sql.Date(uDate.getTime());
        return sDate;
    }
	
	public static java.sql.Timestamp convertTimestamp(java.util.Date uDate) {
		java.sql.Timestamp sTimestamp = new java.sql.Timestamp(uDate.getTime());
        return sTimestamp;
	}
	
	public static java.sql.Date todayDate() {
		return convert(new java.util.Date());
	}
	
	public static java.sql.Timestamp todayTimestamp() {
		return convertTimestamp(new java.util.Date());
	}

	/**
	 * @param bday
	 * @return
	 */
	public static java.sql.Date parseString(String bday) {
		return java.sql.Date.valueOf(bday);
	}

	/**
	 * @param fecha
	 * @param hora
	 * @return
	 */
	public static String formatSmartDate(String fecha, String hora) {
		return fecha.substring(6) + "-" + fecha.substring(3,5) + "-" + fecha.substring(0, 2) + " " + hora;
	}

	/**
	 * @return
	 */
	public static String formatName() {
		java.util.Date date = new java.util.Date(System.currentTimeMillis());
		SimpleDateFormat formatter;
		formatter = new SimpleDateFormat("yyyyMMddHHmm");
		return formatter.format(date);
	}
	
	public static String parseDate(java.util.Date uDate) {
		SimpleDateFormat formatter;
		formatter = new SimpleDateFormat("dd/MM/yyyy - HH:mm");
		return formatter.format(uDate);
	}

	public static java.sql.Timestamp getTodayTimestamp() {
		return convertTimestamp(new java.util.Date());
	}
	
	protected DateManagement() {}
	
}

