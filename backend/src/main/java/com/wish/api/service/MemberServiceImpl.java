package com.wish.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.wish.api.request.MemberLoginReq;
import com.wish.api.request.MemberRegisterReq;
import com.wish.api.request.MemberTestReq;
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
	public Member createMember(MemberRegisterReq memberRegisterInfo) {

		Member member = new Member();
		member.setId(memberRegisterInfo.getId());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		member.setPassword(passwordEncoder.encode(memberRegisterInfo.getPassword()));
		member.setName(memberRegisterInfo.getName());
		member.setEmail(memberRegisterInfo.getEmail());
		return memberRepository.save(member);

	}
	
	@Override
	public boolean loginMember(MemberLoginReq memberLoginInfo) {

		Member member = memberRepository.findById(memberLoginInfo.getId()).get();
		
		String encodedInputPw = passwordEncoder.encode(memberLoginInfo.getPassword());
		

		if( passwordEncoder.matches(memberLoginInfo.getPassword(), member.getPassword())) return true;
		
		
		if( encodedInputPw.equals(member.getPassword())) return true;
		else return false;
	}

	@Override
	public Member getMemberById(String id) {
		// 디비에 유저 정보 조회 (userId 를 통한 조회).
		Member member = memberRepositorySupport.findById(id).get();
		return member;
	}
	
	@Override
	public Member getMembertest2(MemberTestReq testinfo)
	{
		Member member = new Member();
		member.setId(testinfo.getId());
		member.setName(testinfo.getName());
		Member member2 = memberRepository.find2(member.getId(), member.getName()).get();
		return member2;
	}
}
