package com.wish.common.exception.custom.room;

import com.wish.common.exception.ErrorCode;
import com.wish.common.exception.custom.RoomException;

public class RoomMemberUnderMaxMemberCntException extends RoomException{
	
//	public RoomMemberUnderMaxMemberCntException(int maxMember, int nowMember) {
//		super(a, ErrorCode.LESS_THAN_MAX_MEMBER_ROOM);
//		String message = "max Member cnt : " + maxMember + "now Member cnt : " + nowMember + "\n";
//		int a=1;
//		
//	}
	public RoomMemberUnderMaxMemberCntException() {
		super(ErrorCode.LESS_THAN_MAX_MEMBER_ROOM);
	
	}
	
}
