package com.wish.config;

import com.wish.api.service.MemberService;
//import com.wish.common.auth.JwtAuthenticationFilter;
//import com.wish.common.auth.SsafyMemberDetailService;
//
//import com.wish.common.auth.TestFilter;
import com.wish.common.auth.WishUserDetailService;
import com.wish.common.jwt.JwtFilter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;

/**
 * 인증(authentication) 와 인가(authorization) 처리를 위한 스프링 시큐리티 설정 정의.
 */
@Configuration
//@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    //@Autowired
    //private SsafyMemberDetailService ssafyMemberDetailService;
    
    @Autowired
    private MemberService memberService;

	@Autowired
	private WishUserDetailService wishUserDetailService;
    
    // Password 인코딩 방식에 BCrypt 암호화 방식 사용
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

//    // DAO 기반으로 Authentication Provider를 생성
//    // BCrypt Password Encoder와 UserDetailService 구현체를 설정
//    @Bean
//    DaoAuthenticationProvider authenticationProvider() {
//        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
//        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
//        daoAuthenticationProvider.setUserDetailsService(this.ssafyMemberDetailService);
//        return daoAuthenticationProvider;
//    }
//
//    // DAO 기반의 Authentication Provider가 적용되도록 설정
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) {
//        auth.authenticationProvider(authenticationProvider());
//    }

    //spring security를 안거치게 하는 설정.
    @Override
    public void configure(WebSecurity web) throws Exception {
    	web.ignoring()
    	.antMatchers("/resources/**")
    	.antMatchers("/css/**")
    	.antMatchers("/vendor/**")
    	.antMatchers("/js/**")
    	.antMatchers("/favicon*/**")
    	.antMatchers("/img/**")
    	.antMatchers("/swagger-ui/**")
    	.antMatchers("/swagger-resources/**")
    	.antMatchers("/v2/**")
    	.antMatchers("/members/login")
    	.antMatchers("/members/signup")
    	.antMatchers("/members/findPW")
		.antMatchers("/members/check/id")
		.antMatchers("/members/check/name")
		;
    }

//      요청 -> dispatcherServlet -> 컨트롤러 
//      요청  -> 필터 -> 
    	
    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	http
    	.httpBasic().disable() // Http basic Auth  기반으로 로그인 인증창이 뜸.  disable 시에 인증창 뜨지 않음. 
    	.csrf().disable()  // rest api이므로 csrf 보안이 필요없으므로 disable처리.
    	.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 기반 인증이므로 세션 사용 하지않음 // jwt token으로 인증하므로 stateless 하도록 처리.
    	.and()
    	.addFilterBefore(new JwtFilter(wishUserDetailService), UsernamePasswordAuthenticationFilter.class)
    	//.addFilter(new JwtFilter( authenticationManager(), memberService)) //HTTP 요청에 JWT 토큰 인증 필터를 거치도록 필터를 추가
    	.authorizeRequests()
//    	.antMatchers("/members/findPW").authenticated() // 인증이 필요함.
//    	.antMatchers("/members/findPW").permitAll() // 필터 통과. 근데 인증은 걍 허용함.
//    	.anyRequest().authenticated()
//    	.antMatchers("/members/me").hasRole("BASIC")
    	.anyRequest().permitAll()
    	.and().cors();
    }
}