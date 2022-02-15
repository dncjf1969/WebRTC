package com.wish.api.dto.response;

import java.sql.Date;

import com.wish.db.entity.Member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("MemberResponse")
public class MemberRes{
	@ApiModelProperty(name="아이디")
	String userId;
	
	@ApiModelProperty(name="이름")
	String name;
	
	@ApiModelProperty(name="이메일")
	String email;

	@ApiModelProperty(name="가입날짜")
	Date signUpDate;

	@ApiModelProperty(name="캐릭터 번호")
	int characterNum;
	
	public static MemberRes of(Member member) {
		MemberRes res = new MemberRes();
		res.setUserId(member.getId());
		res.setName(member.getName());
		res.setEmail(member.getEmail());
		res.setSignUpDate(member.getSignUpDate());
		res.setCharacterNum(member.getCharacterNumber());
		return res;
	}
}
