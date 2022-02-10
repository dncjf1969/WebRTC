package com.wish.common.exception.custom.member;

import com.wish.common.exception.ErrorCode;
import com.wish.common.exception.custom.MemberException;

public class MemberAlreadyExistsException extends MemberException{
	
	public MemberAlreadyExistsException(){
		super(ErrorCode.EXISTS_MEMBER);
	}
}
