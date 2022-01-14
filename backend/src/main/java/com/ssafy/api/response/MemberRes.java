package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Member;

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
	@ApiModelProperty(name="User ID")
	String userId;
	
	public static MemberRes of(Member member) {
		MemberRes res = new MemberRes();
		res.setUserId(member.getId());
		return res;
	}
}
