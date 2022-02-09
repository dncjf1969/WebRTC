package com.wish.common.exception.custom;

import com.wish.common.exception.ErrorCode;

public class NotFoundRoomException extends RoomException{
	
	public NotFoundRoomException() {
		super(ErrorCode.NOT_FOUND_ROOM);
	}
	
}
