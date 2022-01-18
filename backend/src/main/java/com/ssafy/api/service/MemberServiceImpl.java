package com.ssafy.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.MemberRegisterPostReq;
import com.ssafy.api.request.MemberTestReq;
import com.ssafy.db.entity.Member;
import com.ssafy.db.repository.MemberRepository;
import com.ssafy.db.repository.MemberRepositorySupport;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("memberService")
public class MemberServiceImpl implements MemberService {
	@Autowired
	MemberRepository memberRepository;
	
	@Autowired
	MemberRepositorySupport memberRepositorySupport;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	public Member createMember(MemberRegisterPostReq memberRegisterInfo) {

		Member member = new Member();
		member.setId(memberRegisterInfo.getId());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		member.setPassword(passwordEncoder.encode(memberRegisterInfo.getPassword()));
		return memberRepository.save(member);

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
