package com.wish.common.jwt;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.http.auth.AUTH;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.wish.api.service.MemberService;
import com.wish.common.auth.WishUserDetailService;
import com.wish.common.auth.WishUserDetails;
import com.wish.db.entity.Member;

//필터(Filter)는 디스패처 서블릿(Dispatcher Servlet)에 요청이 전달되기
//전 후에 url 패턴에 맞는 모든 요청에 대해 부가작업을 처리할 수 있는 기능을 제공
//스프링 컨테이너가 아닌 톰캣과 같은 웹컨테이너에 의해 관리가 되므로 디스패처 서블릿으로 가기 전에 요청을 처리하는 것
//출처: https://mangkyu.tistory.com/173 [MangKyu's Diary]


//Filter를 조금 더 확장하여 스프링에서 제공하는 필터가 있는데 그것이 바로 GenericFilterBean
//GenericFilterBean은 기존 Filter에서 얻어올 수 없는 정보였던 Spring의 설정 정보를 가져올 수 있게 확장된 추상 클래스

//즉, spring security는 이러한 필터를 이용해서 
// 보안적인 기능이 있는 필터를 만들어놓은 프레임워크. 
//스프링 시큐리티만이 쓰는 필터가 아님.
//BasicAuthenticationFilter 는 Spring Security의 필터.
//HttpBasic 인증을 처리하는 Filter
//HttpBasic에 header에 username과 password를 실어 보내고 읽어 인증하는 방식.


//필터는 3가지 메서드를 가짐
//init
//dofilter
//destroy


public class JwtFilter extends GenericFilterBean{

	@Autowired
	MemberService memberService;
	
	@Autowired
	WishUserDetailService wishUserDetailService;
	
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		// TODO Auto-generated method stub
		
		System.out.println("this is JwtFilter");
		//클라이언트의 요청을 HttpServletRequest 객체로 만들어주어야 72번째줄에서처럼
		//getHeader를 할 수 있다.
		HttpServletRequest httpReq = (HttpServletRequest) request;
		
		
		//Request의 Header에 있는 jwt 토큰을 가져온다.
		//Header에는 "Authorization" : "Bearer xdcdsdad.." 이런식으로 담겨 있을 것.
		String jwtToken = httpReq.getHeader(JwtUtil.HEADER_KEY);
		
		
		//jwtToken이 없으면 에러.
		if(jwtToken==null) {
			System.err.println("jwt 없어.");
		}
		//토큰의 시작이 "Bearer " 이 아니면
		else if(!jwtToken.startsWith(JwtUtil.TOKEN_PREFIX)) {
			System.err.println("jwt 타입 토큰이 아냐");
		}
		
		
		//jwtToken의 유효성 검사 및 json 객체로 디코딩 한다.
		DecodedJWT decodedJwtToken = JwtUtil.decodingJwt(jwtToken);
		//여기서 에러 있었으면 decodingJwt에서 exception 처리했을거니까 에러 났을 것.
		//만약 아닐수도 있으니
		if(decodedJwtToken.toString() == "에러나면") {}
		
		
		//여기까지 왔으면 JWT는 문제없다. 
		//JWT에 있는 memberId를 가져와서 이걸로 Authentication 객체를 만든다.
		//인가가 필요한 모든 행동들 즉, 컨트롤러에게는 이 Authentication 객체가 넘어간다.
		//즉, 인가를 위해서 Authentication 객체를 만드는 것이다.
		//즉, 지금 접속해온 유저의 ID가 어떠한 권한이 있는지 Authentication 객체를 만들때 설정해주어야한다.
		
		
		//디코딩된 jwt토큰의 payload에서 멤버 아이디 가져옴.
		Claim memberId_claim = decodedJwtToken.getClaim("memberId");
		String memberId = memberId_claim.asString();
		
		
		//Authentication 객체를 만든다.
		//만들어진 auth에는 member 객체와 권한 및 인가를 위한 정보가 담긴 WishUserDetail이 담겨져있다.
		Authentication auth = getAuthentication(memberId);
		
		

		//이 만들어진 auth를 세션 저장소인 securitycontextholder에 저장.
		//의문1. 세션 저장소인 이곳에 매번 저장을 왜 해야하나??? -> 여기에 저장을 해야 필터를 거치고 컨트롤러에 authentication을 인자로 넘길 수 있어서인가??
		SecurityContextHolder.getContext().setAuthentication(auth);
		
		chain.doFilter(request, response);
	}
	
	
	public Authentication getAuthentication(String memberId) {

		WishUserDetails userDetails = (WishUserDetails) wishUserDetailService.findByMemberIdAndGetAuthorities(memberId);
		
		//아이디, 비밀번호, 권한, 생성한 wishUserDetail을 담아서
		//Authentication 인터페이스를 구현한 UsernamePasswordAuthenticationToken 클래스로
		//Authentication 객체를 생성. 그리고 이걸 return
		UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(memberId, "", userDetails.getAuthorities());
		auth.setDetails(userDetails);
		
		return auth;
	}
}












