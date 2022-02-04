//package com.wish.common.util;
//
//import com.auth0.jwt.JWT;
//import com.auth0.jwt.JWTVerifier;
//import com.auth0.jwt.algorithms.Algorithm;
//import com.auth0.jwt.exceptions.*;
//
//import com.auth0.jwt.interfaces.DecodedJWT;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//
//import java.time.Instant;
//import java.time.LocalDateTime;
//import java.time.ZoneId;
//import java.util.Date;
//import java.util.List;
//
//import static com.google.common.collect.Lists.newArrayList;
//
///**
// * jwt 토큰 유틸 정의.
// */
//
///*
// * 비밀키
// * 만료기간
// * 비밀키와 만료일을 application.properties의 설정값으로 인자를 받아서 JwtToken 생성
// */
//
//@Component
//public class JwtTokenUtil_REAL {
//    private static String secretKey;
//    private static Integer expiration;
//    private static Algorithm algo;
//
//    public static final String TOKEN_PREFIX = "Bearer ";
//    public static final String HEADER_KEY = "Authorization";
//    public static final String ISSUER = "wish.com";
//
//
//
//    @Autowired
//    public JwtTokenUtil_REAL(@Value("${jwt.secret}") String secretKey, @Value("${jwt.expiration}") Integer expiration) {
//        this.secretKey = secretKey;
//        this.expiration = expiration;
//        this.algo = Algorithm.HMAC512(secretKey.getBytes());
//        //암호화 알고리즘 다른거도 가능할듯.
//       
//    }
//
////	public void setExpirationTime() {
////    		//JwtTokenUtil.expirationTime = Integer.parseInt(expirationTime);
////    		JwtTokenUtil.expiration = expiration;
////	}
//
//    public static JWTVerifier getVerifier() {
//        return JWT.require(algo).withIssuer(ISSUER).build();
//    }
//
//    public static String createJwtToken(String userId) {
//        Date expirationDate = JwtTokenUtil_REAL.createExpirationDate(expiration);
//        
//        String createdJwt = JwtTokenUtil_REAL.TOKEN_PREFIX;
//        
//        return createdJwt + JWT.create().withIssuer(ISSUER).withClaim("memberId", userId).withExpiresAt(expirationDate)
//                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
//                .sign(algo);
//        
//        //with subject 안하고 그냥 subject 하면 안되나?
////        return JWT.create().withIssuer(ISSUER).withSubject(userId).withClaim("userId", userId).withExpiresAt(expirationDate)
////                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
////                .sign(Algorithm.HMAC512(secretKey.getBytes()));
//    }
//
////    public static String getToken(Instant expires, String userId) {
////        return JWT.create()
////                .withSubject(userId)
////                .withExpiresAt(Date.from(expires))
////                .withIssuer(ISSUER)
////                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
////                .sign(Algorithm.HMAC512(secretKey.getBytes()));
////    }
//
//    //토큰 만료일 지정.
//    //현재 시각에서 인자로 받은 expiration를 더해서 리턴.
//    public static Date createExpirationDate(int expiration) {
//        Date now = new Date();
//        return new Date(now.getTime() + expiration);
//    }
//
//
//    public static DecodedJWT createDecodedJWT(String token) {
//        JWTVerifier verifier = JwtTokenUtil_REAL.getVerifier();
//
//        //token_prefix는 앞에 붙는건가보네.
//        try {
//            DecodedJWT temp_decodedJWT = verifier.verify(token.replace(TOKEN_PREFIX, ""));
//            																
//            return temp_decodedJWT;
//
//        } catch (AlgorithmMismatchException ex) {
//            throw ex;
//        } catch (InvalidClaimException ex) {
//            throw ex;
//        } catch (SignatureGenerationException ex) {
//            throw ex;
//        } catch (SignatureVerificationException ex) {
//            throw ex;
//        } catch (TokenExpiredException ex) {
//            throw ex;
//        } catch (JWTCreationException ex) {
//            throw ex;
//        } catch (JWTDecodeException ex) {
//            throw ex;
//        } catch (JWTVerificationException ex) {
//            throw ex;
//        } catch (Exception ex) {
//            throw ex;
//        }
//    }
//
//    //아래것들은 뭐지
////    public static void handleError(String token) {
////        JWTVerifier verifier = JwtTokenUtil.getVerifier();
////
////        //token_prefix는 앞에 붙는건가보네.
////        try {
////            verifier.verify(token.replace(TOKEN_PREFIX, ""));
////        } catch (AlgorithmMismatchException ex) {
////            throw ex;
////        } catch (InvalidClaimException ex) {
////            throw ex;
////        } catch (SignatureGenerationException ex) {
////            throw ex;
////        } catch (SignatureVerificationException ex) {
////            throw ex;
////        } catch (TokenExpiredException ex) {
////            throw ex;
////        } catch (JWTCreationException ex) {
////            throw ex;
////        } catch (JWTDecodeException ex) {
////            throw ex;
////        } catch (JWTVerificationException ex) {
////            throw ex;
////        } catch (Exception ex) {
////            throw ex;
////        }
////    }
////
////    public static void handleError(JWTVerifier verifier, String token) {
////        try {
////            verifier.verify(token.replace(TOKEN_PREFIX, ""));
////        } catch (AlgorithmMismatchException ex) {
////            throw ex;
////        } catch (InvalidClaimException ex) {
////            throw ex;
////        } catch (SignatureGenerationException ex) {
////            throw ex;
////        } catch (SignatureVerificationException ex) {
////            throw ex;
////        } catch (TokenExpiredException ex) {
////            throw ex;
////        } catch (JWTCreationException ex) {
////            throw ex;
////        } catch (JWTDecodeException ex) {
////            throw ex;
////        } catch (JWTVerificationException ex) {
////            throw ex;
////        } catch (Exception ex) {
////            throw ex;
////        }
////    }
//}
