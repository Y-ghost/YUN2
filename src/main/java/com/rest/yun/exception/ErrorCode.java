package com.rest.yun.exception;

import java.text.MessageFormat;
import java.util.Properties;

import com.rest.yun.util.PropertiesReader;

public enum ErrorCode {

	SERVER_ERROR("-A1"), ILLEGAL_PARAM("-A2"), INVALID_UNAME("-A3"), SERVER_CONNECTION_ERROR("-A4"),

	// Project
	SAVE_PROJECT_FAILED("A100"), UPDATE_PROJECT_FAILED("A101"), DELETE_PROJECT_FAILED("A102"),

	;

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
