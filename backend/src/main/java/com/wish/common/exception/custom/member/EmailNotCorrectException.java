package com.wish.common.exception.custom.member;

import com.wish.common.exception.ErrorCode;
import com.wish.common.exception.custom.MemberException;

public class EmailNotCorrectException extends MemberException{
	
	public EmailNotCorrectException(){
		super(ErrorCode.EMAIL_NOT_CORRECT);
	}
}
