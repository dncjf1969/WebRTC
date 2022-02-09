package com.wish.api.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("LoginResponse")
public class MemberLoginRes extends BaseRes{
	@ApiModelProperty(name="JWT 인증 토큰", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN...")
	String accessToken;
	
	
	public static MemberLoginRes of(int statusCode, String message, String accessToken) {
		MemberLoginRes res = new MemberLoginRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setAccessToken(accessToken);
		
		//TODO
		//멤버정보 추가
		
		return res;
	}
}