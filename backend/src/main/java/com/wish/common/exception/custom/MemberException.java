package com.wish.common.exception.custom;

import com.wish.common.exception.ErrorCode;

public class MemberException extends RuntimeException{

	private ErrorCode errorCode;
	
	public MemberException(String value, ErrorCode errorCode) {
		// TODO Auto-generated constructor stub
		super(value + errorCode.getMessage());
		this.errorCode = errorCode;
	}
	
	public MemberException(int value, ErrorCode errorCode) {
		// TODO Auto-generated constructor stub
		super(value + errorCode.getMessage());
		this.errorCode = errorCode;
	}
	
	public MemberException(ErrorCode errorCode) {
		// TODO Auto-generated constructor stub
		super(errorCode.getMessage());
		this.errorCode = errorCode;
	}
	
	public ErrorCode getErrorCode() {
		return errorCode;
	}
}
