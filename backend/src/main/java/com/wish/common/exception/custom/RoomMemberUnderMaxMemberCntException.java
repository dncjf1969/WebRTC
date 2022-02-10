package com.wish.common.exception.custom;

import com.wish.common.exception.ErrorCode;

public class RoomMemberUnderMaxMemberCntException extends RoomException{
	
	public RoomMemberUnderMaxMemberCntException(int roomId) {
		super(roomId, ErrorCode.NOT_FOUND_ROOM);
	}
	
}
