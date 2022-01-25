package com.wish.api.service;

import com.wish.api.request.MemberLoginReq;
import com.wish.api.request.MemberSignupReq;
import com.wish.db.entity.Member;


public interface MemberService {
	
	Member signupMember(MemberSignupReq memberSignupInfo);
	boolean loginMember(MemberLoginReq memberLoginInfo);
	
	Member getMemberById(String id);
	
}

