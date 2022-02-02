package com.wish.common.auth;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Objects;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.auth0.jwt.interfaces.Claim;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.wish.api.service.MemberService;
import com.wish.common.util.JwtTokenUtil;
import com.wish.common.util.ResponseBodyWriteUtil;
import com.wish.db.entity.Member;

/**
 * 요청 헤더에 jwt 토큰이 있는 경우, 토큰 검증 및 인증 처리 로직 정의.
 */
public class JwtAuthenticationFilter extends BasicAuthenticationFilter {
    private MemberService memeberService;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, MemberService memeberService) {
        super(authenticationManager);
        this.memeberService = memeberService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // Read the Authorization header, where the JWT Token should be
        String header = request.getHeader(JwtTokenUtil.HEADER_KEY);

        // If header does not contain BEARER or is null delegate to Spring impl and exit
        if (header == null || !header.startsWith(JwtTokenUtil.TOKEN_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            // If header is present, try grab user principal from database and perform authorization
            Authentication authentication = getAuthentication(request);
            // jwt 토큰으로 부터 획득한 인증 정보(authentication) 설정.
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception ex) {
            ResponseBodyWriteUtil.sendError(request, response, ex);
            return;
        }

        filterChain.doFilter(request, response);
    }



    // 클라이언트 요청 헤더에 Authorization 키 값에 jwt 토큰이 있는지 확인.
    // jwt 토큰을 디코딩하여 유저 아이디 확인.
    // 유저 아이디가 DB에 있는지 확인.

    // 다 되었다면 유저 인증 정보 생성

    // 클라이언트 요청할떄    "xx" : "token값"
    // "Authorization" : "xxy"

    @Transactional(readOnly = true)
    public Authentication getAuthentication(HttpServletRequest request) throws Exception {
        String token = request.getHeader(JwtTokenUtil.HEADER_KEY);

        if (token != null) {
//            // parse the token and validate it (decode)
//            JWTVerifier verifier = JwtTokenUtil.getVerifier();
//            JwtTokenUtil.handleError(token);
//            DecodedJWT decodedJWT = verifier.verify(token.replace(JwtTokenUtil.TOKEN_PREFIX, ""));
            DecodedJWT decodedJWT = JwtTokenUtil.createDecodedJWT(token);

            
            //String memberId = decodedJWT.getSubject();
            Claim memberId_claim = decodedJWT.getClaim("memberId");
            String memberId = memberId_claim.asString();
            System.out.println(memberId + "가 너의 아이디.");

            // Search in the DB if we find the user by token subject (username)
            // If so, then grab user details and create spring auth token using username, pass, authorities/roles
            if (memberId != null) {
                Member member = memeberService.getMemberById(memberId);
                if(member != null) {
                    // 식별된 정상 유저인 경우, 요청 context 내에서 참조 가능한 인증 정보(jwtAuthentication) 생성.
                    SsafyUserDetails userDetails = new SsafyUserDetails(member);
                    UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken(memberId,
                            null, userDetails.getAuthorities());
                    jwtAuthentication.setDetails(userDetails);
                    return jwtAuthentication;
                }
            }
            return null;
        }
        return null;
    }
}

//
//1. jwt 토큰 만을 쓰면서 간단히 하는거.
//2. spring security 더 공부해서 이해한다음에 구현한다.