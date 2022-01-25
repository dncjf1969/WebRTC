package com.wish.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.wish.api.request.MemberLoginReq;
import com.wish.api.request.MemberSignupReq;
import com.wish.db.entity.Member;
import com.wish.db.repository.MemberRepository;
import com.wish.db.repository.MemberRepositorySupport;


@Service
public class MemberServiceImpl implements MemberService {
	@Autowired
	MemberRepository memberRepository;
	
	@Autowired
	MemberRepositorySupport memberRepositorySupport;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	public Member signupMember(MemberSignupReq memberSignupInfo) {

		Member member = new Member();
		member.setId(memberSignupInfo.getId());
		member.setPassword(passwordEncoder.encode(memberSignupInfo.getPassword()));
		member.setName(memberSignupInfo.getName());
		member.setEmail(memberSignupInfo.getEmail());
		
		return memberRepository.save(member);
	}
	
	@Override
	public boolean loginMember(MemberLoginReq memberLoginInfo) {

		Member member = memberRepository.findById(memberLoginInfo.getId()).get();
		
		if( passwordEncoder.matches(memberLoginInfo.getPassword(), member.getPassword())) return true;
		else return false;
	}

	@Override
	public Member getMemberById(String id) {
		Member member = memberRepositorySupport.findById(id).get();
		
		return member;
	}
	
}
