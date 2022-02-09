package com.wish.common.exception;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;

@Getter
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ErrorCode {
	
	//ROOM
	NOT_FOUND_ROOM(501, "R001", " Room is not Found");
		
	
	private final int statusCode;
	private final String errorCode;
	private final String message;
	
	ErrorCode(final int statusCode, final String errorCode, final String message) {
		// TODO Auto-generated constructor stub
		this.statusCode = statusCode;
		this.errorCode = errorCode;
		this.message = message;
	}

	
}
