package com.wish.common.exception.custom;

import com.wish.common.exception.ErrorCode;

public class FeedbackException extends RuntimeException{

	private ErrorCode errorCode;
	
	public FeedbackException(String value, ErrorCode errorCode) {
		// TODO Auto-generated constructor stub
		super(value + errorCode.getMessage());
		this.errorCode = errorCode;
	}
	
	public FeedbackException(int value, ErrorCode errorCode) {
		// TODO Auto-generated constructor stub
		super(value + errorCode.getMessage());
		this.errorCode = errorCode;
	}
	
	public FeedbackException(ErrorCode errorCode) {
		// TODO Auto-generated constructor stub
		super(errorCode.getMessage());
		this.errorCode = errorCode;
	}
	
	public ErrorCode getErrorCode() {
		return errorCode;
	}
}
