//package com.wish.common.auth;
//
//import java.io.IOException;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.springframework.core.log.LogMessage;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
//
//import com.auth0.jwt.interfaces.Claim;
//import com.auth0.jwt.interfaces.DecodedJWT;
//import com.wish.api.service.MemberService;
//import com.wish.common.util.JwtTokenUtil;
//import com.wish.common.util.ResponseBodyWriteUtil;
//import com.wish.db.entity.Member;
//
//public class JwtFilter_REAL extends BasicAuthenticationFilter{
//	private MemberService memberService;
//	
//	public JwtFilter_REAL(AuthenticationManager authenticationManager, MemberService memberService) {
//		super(authenticationManager);
//		this.memberService = memberService;
//	}
//	
//	@Override
//	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
//			throws IOException, ServletException {
//			
//		System.out.println("Jwt를 검증하는 filter 입니다.");
//		
//		try {
//			
//			//클라이언트에서 요청 헤더에 Authorization : (암호화된 jwt토큰)을 보내줄 것.
//			//헤더에 Authorization 이라고 들어온 걸 읽는다. 
//			
//			String encodedJwtToken = request.getHeader(JwtTokenUtil.HEADER_KEY);
//			
//			//헤더에 jwt토큰이 없을때.
//			if(encodedJwtToken  == null) {
//				System.err.println("jwt 토큰 없음");
//			}
//			//토큰 타입이 Bearer 이 아닐때. 즉 jwt 타입 토큰이 아닐때
//			else if(!encodedJwtToken.startsWith(JwtTokenUtil.TOKEN_PREFIX)) {
//				System.err.println("토큰 타입이 Bearer이 아님");
//				
//				//이셉션 처리
//			}
//			
//			//헤더에 토큰이 있고 그게 jwt 토큰이 맞으면
//			//디코딩한다.
//			//createDecodedJWT에서 유효성 검사도 함. 검사하고 문제없으면 디코딩된 결과 돌려줌.
//			DecodedJWT decodedJWT = JwtTokenUtil.createDecodedJWT(encodedJwtToken);
//			
//			//디코딩된 JWT에서 멤버아이디 key의 value를 꺼내서 저장.
//			Claim memberId_claim = decodedJWT.getClaim("memberId");
//			String memberId = memberId_claim.asString();
//			
//			Member member = memberService.getMemberById(memberId);
//			//memberId로 멤버 db에서 찾았는데 없으면
//			if(member ==null) {
//				System.err.println(memberId + " ?? 그런 유저 없음");
//			}
//			
//			//SecurityContextHolder에 있으면
//			//아래 동작 안한다.
////			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
////			System.out.println(authentication.getName());
////			if() {
////				
////			}
//			
//			//있으면 이 정보를 이용해 Authentication 객체를 만든다.
//			//이 객체에 담을 userDetail부터 만든다.
//			SsafyUserDetails userDetails = new SsafyUserDetails(member);
//			UsernamePasswordAuthenticationToken jwtAuthenticationToken = new UsernamePasswordAuthenticationToken(memberId, null, userDetails.getAuthorities());
//			jwtAuthenticationToken.setDetails(userDetails);
//			
//			
//			//세션 저장소인 SecurityHolder에 인증정보를 저장한다.
//			SecurityContextHolder.getContext().setAuthentication(jwtAuthenticationToken);
//			
//			
//		}
//		catch (Exception e) {
//			ResponseBodyWriteUtil.sendError(request, response, e);
//			// TODO: handle exception
//			
//			return;
//		}
//		
//		chain.doFilter(request, response);
//	}
//}
