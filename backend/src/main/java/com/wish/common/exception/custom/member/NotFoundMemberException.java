package com.wish.common.exception.custom.member;

import com.wish.common.exception.ErrorCode;
import com.wish.common.exception.custom.MemberException;

public class NotFoundMemberException extends MemberException{
	
	public NotFoundMemberException(){
		super(ErrorCode.NOT_FOUND_MEMBER);
	}
}
