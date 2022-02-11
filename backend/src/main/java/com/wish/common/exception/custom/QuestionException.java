package com.wish.common.exception.custom;

import com.wish.common.exception.ErrorCode;

public class QuestionException extends RuntimeException{

	private ErrorCode errorCode;
	
	public QuestionException(String value, ErrorCode errorCode) {
		// TODO Auto-generated constructor stub
		super(value + errorCode.getMessage());
		this.errorCode = errorCode;
	}
	
	public QuestionException(int value, ErrorCode errorCode) {
		// TODO Auto-generated constructor stub
		super(value + errorCode.getMessage());
		this.errorCode = errorCode;
	}
	
	public QuestionException(ErrorCode errorCode) {
		// TODO Auto-generated constructor stub
		super(errorCode.getMessage());
		this.errorCode = errorCode;
	}
	
	public ErrorCode getErrorCode() {
		return errorCode;
	}
}
