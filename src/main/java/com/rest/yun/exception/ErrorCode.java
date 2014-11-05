package com.rest.yun.exception;

import java.text.MessageFormat;
import java.util.Properties;

import com.rest.yun.util.PropertiesReader;

public enum ErrorCode {

	SERVER_ERROR("-A1"), ILLEGAL_PARAM("-A2"), INVALID_UNAME("-A3"), SERVER_CONNECTION_ERROR("-A4"),

	// Project
	SAVE_PROJECT_FAILED("A100"), UPDATE_PROJECT_FAILED("A101"), DELETE_PROJECT_FAILED("A102"),

	PROJECT_NAME_EMPTY("A103"), PROJECT_NAME_DUPLICATE("A104"),PROJECT_LIST_NULL("A105"),

	// Host
	SAVE_HOST_FAILED("A200"), UPDATE_HOST_FAILED("A201"), DELETE_HOST_FAILED("A202"),

	HOST_CODE_EMPTY("A203"), HOST_CODE_DUPLICATE("A204"), HOST_CODE_NOLY_ONE_FOR_PROJECT("A205"),
	
	// Equipment
	SAVE_EQUIPMENT_FAILED("A300"), UPDATE_EQUIPMENT_FAILED("A301"), DELETE_EQUIPMENT_FAILED("A302"),
	
	EQUIPMENT_CODE_EMPTY("A303"), EQUIPMENT_CODE_DUPLICATE("A304"), EQUIPMENT_LIST_NULL("A305"), 
	
	SELECT_EQUIPMENT_LIST_FAILED("A306");

	private String code;

	private Object[] values;

	private static final String ERROR_CONFIG = "/errorCode.properties";

	private static final Properties errorMessageConfig = PropertiesReader.read(ERROR_CONFIG);

	ErrorCode(String code) {
		this.code = code;
	}

	public String getMessage() {
		String message = errorMessageConfig.getProperty(String.valueOf(code));
		if (message == null) {
			return "";
		}
		if (values != null) {
			message = MessageFormat.format(message, values);
		}
		return message;
	}

	public void setValues(Object[] values) {
		this.values = values;
	}

	public String getCode() {
		return code;
	}
}
