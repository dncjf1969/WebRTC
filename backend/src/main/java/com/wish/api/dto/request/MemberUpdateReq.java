package com.wish.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@ApiModel("MemberUpdateReq")
public class MemberUpdateReq {
	@ApiModelProperty(name="아이디", example="ssafy_web")
	String id;
	@ApiModelProperty(name="패스워드", example="your_password")
	String password;
	
	@ApiModelProperty(name="이름", example="홍길동")
	String name;
	
	@ApiModelProperty(name="이메일", example="hong123@gmail.com")
	String email;
}
