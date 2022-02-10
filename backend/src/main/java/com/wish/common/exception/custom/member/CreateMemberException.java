package com.wish.common.exception.custom.member;

import com.wish.common.exception.ErrorCode;
import com.wish.common.exception.custom.MemberException;

public class CreateMemberException extends MemberException{
	
	public CreateMemberException(){
		super(ErrorCode.CREATE_MEMBER);
	}
}
