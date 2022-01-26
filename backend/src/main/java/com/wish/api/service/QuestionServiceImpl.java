package com.wish.api.service;

import com.wish.api.request.MemberUpdateReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



import com.wish.api.request.MemberLoginReq;
import com.wish.api.request.MemberSignupReq;
import com.wish.db.entity.Member;
import com.wish.db.repository.MemberRepository;
import com.wish.db.repository.MemberRepositorySupport;

import java.util.Optional;


@Service
public class MemberServiceImpl implements MemberService {
	@Autowired
	MemberRepository memberRepository;
	
	@Autowired
	MemberRepositorySupport memberRepositorySupport;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	JavaMailSender javamailSender;

	@Override
	public int signupMember(MemberSignupReq memberSignupInfo) {

		//회원가입 안되는 조건
		//1. 중복된 아이디가 있으면 안됨.
		Optional<Member> temp_member = memberRepository.findById(memberSignupInfo.getId());

		//중복되는 아이디가 없다면
		if(!temp_member.isPresent()){
			Member member = new Member();
			member.setId(memberSignupInfo.getId());
			member.setPassword(passwordEncoder.encode(memberSignupInfo.getPassword()));
			member.setName(memberSignupInfo.getName());
			member.setEmail(memberSignupInfo.getEmail());

			memberRepository.save(member);

			//성공
			return 0;
		}
		else{
			//이미 등록된 아이디입니다.
			return 1;
		}

	}
	
	@Override
	public boolean loginMember(MemberLoginReq memberLoginInfo) {

		Member member = memberRepository.findById(memberLoginInfo.getId()).get();
		
		if( passwordEncoder.matches(memberLoginInfo.getPassword(), member.getPassword())) return true;
		else return false;
	}

	@Override
	public int updateMember(MemberUpdateReq memberUpdateInfo){

		//회원수정 안되는 조건
		//1. 인자로 넣은 아이디가 없으면 안됨.
		Optional<Member> temp_member = memberRepository.findById(memberUpdateInfo.getId());

		//아이디로 찾은게 db에 있다면
		if(temp_member.isPresent()){
			Member member = new Member();
			member.setId(memberUpdateInfo.getId());
			member.setPassword(passwordEncoder.encode(memberUpdateInfo.getPassword()));
			member.setName(memberUpdateInfo.getName());
			member.setEmail(memberUpdateInfo.getEmail());

			memberRepository.save(member);

			//성공
			return 0;
		}
		else{
			//없는 아이디입니다.
			return 1;
		}
	}

	@Override
	public int deleteMember(String memberDeleteId) {
		//회원삭제 안되는 조건
		//1. 인자로 넣은 아이디가 없으면 안됨.
		Optional<Member> temp_member = memberRepository.findById(memberDeleteId);

		System.out.println(memberDeleteId);
		//id로 찾은게 있다면
		if(temp_member.isPresent()){
			Member delete_member = temp_member.get();
			memberRepository.delete(delete_member);

			//성공
			return 0;
		}
		else{
			//없는 아이디입니다.
			return 1;
		}
	}


	@Override
	public int findPassword(String memberId, String memberEmail){

		//비밀번호 찾기 안되는 조건
		//1. 인자로 넣은 아이디가 없으면 안됨.
		Optional<Member> temp_member = memberRepository.findById(memberId);

		//아이디로 찾은게 db에 있다면
		if(temp_member.isPresent()){

			Member member = temp_member.get();

			if(member.getEmail().equals(memberEmail)){

				String randomPW = "111";
				member.setPassword(passwordEncoder.encode(randomPW));

				memberRepository.save(member);

				System.out.println(member.getEmail());
				//메일 보내기
				SimpleMailMessage message = new SimpleMailMessage();
				message.setSubject("[공지] 비밀번호");
				message.setText("임시 비밀번호는 " + randomPW + " 입니다.");
				message.setFrom("kyung_ho@naver.com");
				message.setTo(member.getEmail());

				try {
					javamailSender.send(message);
					return 0;
				} catch (MailException e) {
					e.printStackTrace();
				}
			}
			//이메일을 확인해주세요.
			else return 1;
		}
		else{
			//아이디 확인해주세요.
			return 1;
		}

		return 1;
	}


	@Override
	public Member getMemberById(String id) {
		Member member = memberRepositorySupport.findById(id).get();
		
		return member;
	}
	
}
