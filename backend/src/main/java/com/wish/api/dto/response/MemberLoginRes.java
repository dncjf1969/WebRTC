package com.wish.api.dto.response;

import com.wish.db.entity.Member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("MemberLoginRes")
public class MemberLoginRes extends BaseRes{
	@ApiModelProperty(name="JWT 인증 토큰", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN...")
	String accessToken;

	@ApiModelProperty(name="아이디")
	String userId;
	@ApiModelProperty(name="이름")
	String name;
	
	public static MemberLoginRes of(int statusCode, String message, String accessToken, Member member) {
		MemberLoginRes res = new MemberLoginRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setAccessToken(accessToken);
		
		//TODO
		//멤버정보 추가
		res.setUserId(member.getId());
		res.setName(member.getName());
		
		return res;
	}
}