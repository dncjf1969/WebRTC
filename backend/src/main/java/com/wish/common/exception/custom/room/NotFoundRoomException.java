package com.wish.common.exception.custom.room;

import com.wish.common.exception.ErrorCode;
import com.wish.common.exception.custom.RoomException;

public class NotFoundRoomException extends RoomException{
	
	public NotFoundRoomException(int roomId) {
		super(roomId, ErrorCode.NOT_FOUND_ROOM);
	}
	
}
