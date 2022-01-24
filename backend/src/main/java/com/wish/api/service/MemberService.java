package com.wish.api.service;

import com.wish.api.request.MemberLoginPostReq;
import com.wish.api.request.MemberRegisterPostReq;
import com.wish.api.request.MemberTestReq;
import com.wish.db.entity.Member;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface MemberService {
	Member createMember(MemberRegisterPostReq memberRegisterInfo);
	Member getMemberById(String id);
	
	Member getMembertest2(MemberTestReq testinfo);
	
	boolean loginMember(MemberLoginPostReq memberLoginInfo);
}

