package com.wish.common.auth;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.wish.api.service.MemberService;
import com.wish.db.entity.Member;
import com.wish.db.entity.Role;
import com.wish.db.repository.RoleRepositiory;


/**
 * 현재 액세스 토큰으로 부터 인증된 유저의 상세정보(활성화 여부, 만료, 롤 등) 관련 서비스 정의.
 */
@Component
public class WishUserDetailService implements UserDetailsService{
	@Autowired
	MemberService memberService;
	
	@Autowired
	RoleRepositiory roleRepositiory;
	
	
	@Override
    public UserDetails loadUserByUsername(String memberId) throws UsernameNotFoundException {
    		Member member = memberService.getMemberById(memberId);
    		if(member != null) {
    			WishUserDetails userDetails = new WishUserDetails(member);
    			return userDetails;
    		}
    		return null;
    }
	
	
	//memberId로 DB에서 회원정보를 가져온다. -> member 객체 생성.
	//이 member 객체에 있는 권한 정보를 꺼내서 Authentication이 사용할 수 있는
	//Authorities에 추가해준다.
	public UserDetails findByMemberIdAndGetAuthorities(String memberId) throws UsernameNotFoundException {
		Member member = memberService.getMemberById(memberId);
		if(member != null) {
			WishUserDetails userDetails = new WishUserDetails(member);
			
			//멤버 DB에 있는 권한 정보 가져와서 만든다.
			List<Role> role = roleRepositiory.findByMemberId(member.getId()).get();
			List<String> roles = new ArrayList<>();
			for(int a=0; a<role.size(); a++) roles.add(role.get(a).getRole());
			
			userDetails.setAuthorities(roles);
			return userDetails;
		}
		return null;
	}
}
