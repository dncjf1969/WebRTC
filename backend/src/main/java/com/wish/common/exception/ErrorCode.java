package com.wish.common.exception;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ErrorCode {
	
	//ROOM
	NOT_FOUND_ROOM(599, "R001", "Room is not Found");
		
	
	private int statusCode;
	private String errorCode;
	private String message;
	
	ErrorCode(final int statusCode, final String errorCode, final String message) {
		// TODO Auto-generated constructor stub
		this.statusCode = statusCode;
		this.errorCode = errorCode;
		this.message = message;
	}
	
	
}
