package com.wish.common.exception.custom;

import com.wish.common.exception.ErrorCode;

public class RoomException extends RuntimeException{

	private ErrorCode errorCode;
	
	public RoomException(int roomId, ErrorCode errorCode) {
		// TODO Auto-generated constructor stub
		super(roomId + errorCode.getMessage());
		this.errorCode = errorCode;
	}
	
	public ErrorCode getErrorCode() {
		return errorCode;
	}
}
