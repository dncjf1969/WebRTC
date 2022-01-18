package com.ssafy.common.auth;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.ssafy.api.service.MemberService;
import com.ssafy.db.entity.Member;


/**
 * 현재 액세스 토큰으로 부터 인증된 유저의 상세정보(활성화 여부, 만료, 롤 등) 관련 서비스 정의.
 */
@Component
public class SsafyMemberDetailService implements UserDetailsService{
	@Autowired
	MemberService memberService;
	
    @Override
    public UserDetails loadUserByUsername(String membername) throws UsernameNotFoundException {
    		Member member = memberService.getMemberById(membername);
    		if(member != null) {
    			SsafyUserDetails userDetails = new SsafyUserDetails(member);
    			return userDetails;
    		}
    		return null;
    }
}
