package com.wish.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("MemberSignupReq")
public class MemberSignupReq {
	@ApiModelProperty(name="아이디", example="ssafy_web")
	String id;
	@ApiModelProperty(name="패스워드", example="your_password")
	String password;
	
	@ApiModelProperty(name="이름", example="홍길동")
	String name;
	
	@ApiModelProperty(name="이메일", example="hong123@gmail.com")
	String email;

	@ApiModelProperty(name="캐릭터 번호", example="0~4")
	int characterNumber;
}
