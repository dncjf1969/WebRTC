package com.wish.common.exception.custom.member;

import com.wish.common.exception.ErrorCode;
import com.wish.common.exception.custom.MemberException;

public class LoginMemberException extends MemberException{
	
	public LoginMemberException(){
		super(ErrorCode.LOGIN_MEMBER);
	}
}
