package com.wish.api.dto.response;

import java.util.List;

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
@ApiModel("MypageRes")
public class MypageRes{
	Member member;
	List<FeedbackRes> feedback;
	List<MeetingCountRes> count;
	
	public static MypageRes of(Member member, List<FeedbackRes> feedback, List<MeetingCountRes> count) {
		MypageRes res = new MypageRes();
		res.setMember(member);
		res.setFeedback(feedback);
		res.setCount(count);
		return res;
	}
}
