package com.wish.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.wish.api.dto.request.MemberLoginReq;
import com.wish.api.dto.request.MemberSignupReq;
import com.wish.api.dto.request.MemberUpdateReq;
import com.wish.api.dto.response.MeetingCountRes;
import com.wish.db.entity.Member;
import com.wish.db.repository.MemberRepository;
import com.wish.db.repository.MemberRepositorySupport;

import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
public class MeetingServiceImpl implements MeetingService {

	@Override
	public MeetingCountRes getMeetingCounts(String memberId) {
		// TODO Auto-generated method stub
		return null;
	}
	

	
}
