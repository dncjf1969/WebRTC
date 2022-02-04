package com.wish.common.jwt;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;


//JWT는 Header, Payload, Signature의 3 부분으로 이루어지며, Json 형태인 각 부분은 Base64로 인코딩 되어 표현된다. 
//또한 각각의 부분을 이어 주기 위해 . 구분자를 사용하여 구분한다. 
//추가로 Base64는 암호화된 문자열이 아니고, 같은 문자열에 대해 항상 같은 인코딩 문자열을 반환한다.


//서명(Signature)은 토큰을 인코딩하거나 유효성 검증을 할 때 사용하는 고유한 암호화 코드이다. 
//서명(Signature)은 위에서 만든 헤더(Header)와 페이로드(Payload)의 값을 각각 BASE64로 인코딩하고, 인코딩한 값을 비밀 키를 이용해 헤더(Header)에서 정의한 알고리즘으로 해싱을 하고, 이 값을 다시 BASE64로 인코딩하여 생성한다.
//서명에서 사용하는 비밀키는 서버만 알고 있기 때문에 토큰을 가짜로 만드는 것은 불가능.
//하지만 탈취되면 위험함.

//개발자가 직접 작성한 클래스를 Bean으로 등록하기 위해 사용하는 Component 어노테이션
@Component
public class JwtUtil {
	
	public static final String TOKEN_PREFIX = "Bearer ";
	public static final String ISSUER = "wish.com";
	public static final String HEADER_KEY = "Authorization";
	
	
	private static String secretKey; // jwt 서명을 만들때 사용하는 비밀키
	private static int expirationTime; // jwt 토큰의 수명
	private static Algorithm algo; // jwt 서명을 만들때 사용하는 해시 알고리즘. Header에 포함된다.
	
	//필요한 의존 객체의 “타입"에 해당하는 빈을 찾아 주입하는 Autowired 어노테이션
	//Value 어노테이션을 이용해서 properties에 있는 값을 읽어온다.
	@Autowired    
	public JwtUtil(@Value("${jwt.secretKey}") String secretKey, @Value("${jwt.expirationTime}") int expirationTime) {
		this.secretKey = secretKey;
		this.expirationTime = expirationTime;
		this.algo = Algorithm.HMAC512(secretKey);
	}
	
	//멤버id를 인자로 받아 jwt 토큰을 생성한다.
	public static String createJwt(String memberId) {
		//현재 시각에 만료 수명을 더해서 만료시간을 만든다.
		Date expirationDate = new Date(new Date().getTime() + expirationTime);
		
		//발급한사람, 만료시간, 멤버아이디를 payload에 넣어서 jwt 토큰 생성.
		//알고리즘은 생성자에서 정의한 HMAC512 해시 함수 사용. 
		//해시 알고리즘에서 사용하는 비밀키는 생성자에서 받아온 properties에서 정의한 jwt.secretKey를 사용.
		return TOKEN_PREFIX + JWT.create().withIssuer(ISSUER).withExpiresAt(expirationDate)
				.withClaim("memberId", memberId).sign(algo);
	}
	
	//jwt토큰의 유효성을 검사하고 디코딩하여 json 객체로 돌려준다.
	public static DecodedJWT decodingJwt(String jwtToken) {
		//토큰을 생성했을때 사용했던 해시 알고리즘으로 검증기를 만든다.
		//검증기에 발행자를 ISSUER로 등록해놓는다.
		//토큰이 만료시간에서 1분 지난거는 허용한다. 네트워크 지연때문에 잠깐 늦게 도착한거,, 근데 없어도됨.
		JWTVerifier jwtverifier = JWT.require(algo).withIssuer(ISSUER).acceptExpiresAt(1*60).build();
		
		//만든 검증기를 이용해서 jwt 토큰이 유효한지 확인한다.
		//인풋으로 사용하는 jwtToken의 Bearer은 없애고 검증기의 입력으로 사용한다.
		//base64는 인코딩된 Header와 Payload를 디코딩한다. -> 누구나 할 수 있음.
		//Header에 있는 해시 알고리즘과 서버의 비밀키를 이용해서 똑같이 서명을 만들어 본다.
		//이때 만들어본 서명이랑 같은지 비교해보고 같다면 우리가 만든 거 맞구나 확인한다.
		//이거는 서명이 유효한지 확인하는 것.  -> SignatureVerificationException
		//검증기에 등록해두었던 알고리즘이 다른 것이라던가  ->  AlgorithmMismatchException
		//이미 만료되었다던가 등 다 확인한다.  -> TokenExpiredException
		DecodedJWT decodedJwt = jwtverifier.verify(jwtToken.replace(TOKEN_PREFIX, ""));
		
		//이셉션 처리 추가할 것.
		
		return decodedJwt;
	}
	
	
	
}
