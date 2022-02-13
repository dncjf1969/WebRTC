package com.wish.api.service;

import com.wish.api.dto.request.MemberLoginReq;
import com.wish.api.dto.request.MemberSignupReq;
import com.wish.api.dto.request.MemberUpdateReq;
import com.wish.db.entity.Member;


public interface MemberService {
	
	void signupMember(MemberSignupReq memberSignupInfo);
	Member loginMember(MemberLoginReq memberLoginInfo);

	void updateMember(MemberUpdateReq memberUpdateInfo);
	void deleteMember(String memberDeleteId);
	void findPassword(String memberId, String memberEmail);

	Member getMemberById(String id);
	
	boolean checkId(String id);
	boolean checkName(String name);
	
}

