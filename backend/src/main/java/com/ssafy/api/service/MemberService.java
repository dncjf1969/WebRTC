package com.ssafy.api.service;

import com.ssafy.api.request.MemberRegisterPostReq;
import com.ssafy.db.entity.Member;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface MemberService {
	Member createMember(MemberRegisterPostReq memberRegisterInfo);
	Member getMemberById(String id);
}
