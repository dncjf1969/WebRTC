package com.wish.common.exception.custom.member;

import com.wish.common.exception.ErrorCode;
import com.wish.common.exception.custom.MemberException;

public class DeleteMemberException extends MemberException{
	
	public DeleteMemberException(){
		super(ErrorCode.DELETE_MEMBER);
	}
}
