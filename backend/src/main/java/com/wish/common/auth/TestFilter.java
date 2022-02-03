package com.wish.common.auth;

import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.wish.api.service.MemberService;
import com.wish.common.util.JwtTokenUtil;
import com.wish.common.util.ResponseBodyWriteUtil;
import com.wish.db.entity.Member;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 요청 헤더에 jwt 토큰이 있는 경우, 토큰 검증 및 인증 처리 로직 정의.
 */
public class TestFilter extends BasicAuthenticationFilter {
    private MemberService memeberService;

    public TestFilter(AuthenticationManager authenticationManager, MemberService memeberService) {
        super(authenticationManager);
        this.memeberService = memeberService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        System.out.println("Test Filter");

        String memberId = "a";
        Member member = memeberService.getMemberById(memberId);

        SsafyUserDetails userDetails = new SsafyUserDetails(member);
        UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken(memberId,
                null, userDetails.getAuthorities());
        jwtAuthentication.setDetails(userDetails);

        Authentication authentication = jwtAuthentication;
        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);
    }
}
