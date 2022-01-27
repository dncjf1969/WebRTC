package com.wish.api.service;

import com.wish.api.dto.request.MemberLoginReq;
import com.wish.api.dto.request.MemberSignupReq;
import com.wish.api.dto.request.MemberUpdateReq;
import com.wish.db.entity.Member;


public interface MemberService {
	
	int signupMember(MemberSignupReq memberSignupInfo);
	boolean loginMember(MemberLoginReq memberLoginInfo);

	int updateMember(MemberUpdateReq memberUpdateInfo);
	int deleteMember(String memberDeleteId);

	int findPassword(String memberId, String memberEmail);

	Member getMemberById(String id);
	
	boolean checkId(String id);
	boolean checkName(String name);
	
}

