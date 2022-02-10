package com.wish.common.exception.custom.member;

import com.wish.common.exception.ErrorCode;
import com.wish.common.exception.custom.MemberException;

public class UpdateMemberException extends MemberException{
	
	public UpdateMemberException(){
		super(ErrorCode.UPDATE_MEMBER);
	}
}
