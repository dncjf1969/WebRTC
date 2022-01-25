package com.wish.api.service;

import com.wish.api.request.MemberLoginReq;
import com.wish.api.request.MemberSignupReq;
import com.wish.api.request.MemberUpdateReq;
import com.wish.db.entity.Member;


public interface MemberService {
	
	int signupMember(MemberSignupReq memberSignupInfo);
	boolean loginMember(MemberLoginReq memberLoginInfo);

	int updateMember(MemberUpdateReq memberUpdateInfo);
	int deleteMember(String memberDeleteId);

	int findPassword(String memberId, String memberEmail);

	Member getMemberById(String id);
	
}

