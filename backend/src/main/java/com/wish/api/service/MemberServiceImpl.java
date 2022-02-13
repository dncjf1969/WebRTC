package com.wish.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.wish.api.dto.request.MemberLoginReq;
import com.wish.api.dto.request.MemberSignupReq;
import com.wish.api.dto.request.MemberUpdateReq;
import com.wish.common.exception.custom.member.CreateMemberException;
import com.wish.common.exception.custom.member.DeleteMemberException;
import com.wish.common.exception.custom.member.EmailNotCorrectException;
import com.wish.common.exception.custom.member.LoginMemberException;
import com.wish.common.exception.custom.member.MemberAlreadyExistsException;
import com.wish.common.exception.custom.member.NotFoundMemberException;
import com.wish.common.exception.custom.member.UpdateMemberException;
import com.wish.db.entity.Member;
import com.wish.db.repository.MemberRepository;
import com.wish.db.repository.MemberRepositorySupport;

import java.util.Optional;
import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;


@Service
public class MemberServiceImpl implements MemberService {
	@Autowired
	MemberRepository memberRepository;
	
	@Autowired
	MemberRepositorySupport memberRepositorySupport;
	
	@Autowired
	RoleService roleService;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	JavaMailSender javamailSender;

	@Override
	public void signupMember(MemberSignupReq memberSignupInfo) {

		//회원가입 안되는 조건
		//1. 중복된 아이디가 있으면 안됨.
		Optional<Member> temp_member = memberRepository.findById(memberSignupInfo.getId());

		//중복되는 아이디가 있다면
		if(temp_member.isPresent()) throw new MemberAlreadyExistsException();
		
		try {
			Member member = new Member();
			member.setId(memberSignupInfo.getId());
			member.setPassword(passwordEncoder.encode(memberSignupInfo.getPassword()));
			member.setName(memberSignupInfo.getName());
			member.setEmail(memberSignupInfo.getEmail());
			member.setSignUpDate(member.getSignUpDate());
			member.setCharacterNumber(memberSignupInfo.getCharacterNumber());
			
			//role 테이블에 회원 아이디와 권한 추가.
			roleService.createRole(memberSignupInfo.getId(), "BASIC");
			
			memberRepository.save(member);
			
		} catch ( CreateMemberException e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public Member loginMember(MemberLoginReq memberLoginInfo) {

		Optional<Member> temp_member = memberRepository.findById(memberLoginInfo.getId());
		
		if(!temp_member.isPresent()) throw new NotFoundMemberException();
		
		Member member = temp_member.get();
		
		if(!passwordEncoder.matches(memberLoginInfo.getPassword(), member.getPassword())) throw new LoginMemberException();
		
		return member;
	}

	@Override
	public void updateMember(MemberUpdateReq memberUpdateInfo){

		//회원수정 안되는 조건
		//1. 인자로 넣은 아이디가 없으면 안됨.
		Optional<Member> temp_member = memberRepository.findById(memberUpdateInfo.getId());

		if(!temp_member.isPresent()) throw new NotFoundMemberException();
		
		try {
			Member member = new Member();
			member.setId(memberUpdateInfo.getId());
			member.setPassword(passwordEncoder.encode(memberUpdateInfo.getPassword()));
			member.setName(memberUpdateInfo.getName());
			member.setEmail(memberUpdateInfo.getEmail());
			member.setCharacterNumber(memberUpdateInfo.getCharacterNumber());

			memberRepository.save(member);
			
		} catch (UpdateMemberException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void deleteMember(String memberDeleteId) {
		//회원삭제 안되는 조건
		//1. 인자로 넣은 아이디가 없으면 안됨.
		Optional<Member> temp_member = memberRepository.findById(memberDeleteId);

		if(!temp_member.isPresent()) throw new NotFoundMemberException();
		
		try {
			Member delete_member = temp_member.get();
			memberRepository.delete(delete_member);
			
			roleService.deleteRole(delete_member.getId(), "BASIC");
			
		} catch ( DeleteMemberException e) {
			e.printStackTrace();
		}
	}


	@Override
	public void findPassword(String memberId, String memberEmail){

		//비밀번호 찾기 안되는 조건
		
		Optional<Member> temp_member = memberRepository.findById(memberId);

		//1. 아이디에 맞는 멤버가 없으면 안됨.
		if(!temp_member.isPresent()) throw new NotFoundMemberException();
			
		//아이디로 찾은게 db에 있다면
		Member member = temp_member.get();

		if(!member.getEmail().equals(memberEmail)) throw new EmailNotCorrectException();
		
		String randomPW = "";
		
		Random rand = new Random();
		while(randomPW.length()<6) {
			
			int rand_pw = rand.nextInt(75); //0 - 74
			rand_pw+=48; // 48 - 122
			
			//48 - 57 : 숫자
			//65 - 89 : 대문자
			//98 - 122 : 소문자
			if(rand_pw>57 && rand_pw<65) continue;
			if(rand_pw>90 && rand_pw<97) continue;
			
			randomPW += (char)rand_pw;
		}
		
		member.setPassword(passwordEncoder.encode(randomPW));

		memberRepository.save(member);
		
		StringBuffer mailcontent = new StringBuffer();
		mailcontent.append("<!DOCTYPE html>");
		mailcontent.append("<html>");
        mailcontent.append("<head>");
        mailcontent.append("</head>");
        mailcontent.append("<body>");
        mailcontent.append("<div>");
        mailcontent.append("<div>");
        mailcontent.append("<img src=\"https://github.com/yesfordev/homedong/blob/develop/frontend/public/favicon.png?raw=true\">");
        mailcontent.append("<div style=\"background-color:rgb(243, 248, 251); width: 800px; float: left;\">");
        mailcontent.append("<div style=\"margin: 7px; padding: 10px; font-family: Trebuchet MS;\">");
        mailcontent.append("<p> 안녕하세요. WISH입니다.</p>");
        mailcontent.append("<p> 오늘도 WISH를 찾아주셔서 감사합니다.</p>");
        mailcontent.append("<p> 당신의 임시 비밀번호는 <b style=\"font-size: 14pt;\">");
        mailcontent.append(randomPW);
        mailcontent.append("</b> 입니다.</p>");
        mailcontent.append("<p> 위의 비밀번호로 로그인 후, 비밀번호를 수정하여 주세요.</p>");
        mailcontent.append("<p> 당신의 취업이 성공하는 그날까지 WISH</p>");
        mailcontent.append("<img src=\"https://github.com/yesfordev/homedong/blob/develop/frontend/public/favicon.png?raw=true\" style=\"opacity: 30%; float: right; width: 40%;\">");
        mailcontent.append("</div>");
        mailcontent.append(" <p style=\"font-size: 3pt; margin-top: 60px; margin-left: 17px;\"> Copyright © WISH All Rights Reserved </p>");
        mailcontent.append("</div>");
        mailcontent.append("</div>");
        mailcontent.append("</div>");
        mailcontent.append("</body>");
        mailcontent.append("</html>");
		
		//메일 보내기
//		SimpleMailMessage message2 = new SimpleMailMessage();
		MimeMessage message = javamailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");
		
		try {
			helper.setSubject("[공지] 비밀번호");
			helper.setText(mailcontent.toString(), true);
			//message.setText("임시 비밀번호는 " + randomPW + " 입니다.");
			helper.setFrom("kyung_ho@naver.com");
			helper.setTo(member.getEmail());
		} catch (MessagingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		try {
			javamailSender.send(message);
		} catch (MailException e) {
			e.printStackTrace();
		}
	}


	@Override
	public Member getMemberById(String id) {
		Member member = memberRepositorySupport.findById(id).get();
		
		return member;
	}

	@Override
	public boolean checkId(String id) {
		return memberRepository.existsById(id);
	}

	@Override
	public boolean checkName(String name) {
		return memberRepository.existsByName(name);
	}
	
}
