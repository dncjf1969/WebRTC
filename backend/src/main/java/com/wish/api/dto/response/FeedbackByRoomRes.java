package com.wish.api.dto.response;

import java.util.ArrayList;
import java.util.List;

import com.wish.db.entity.Feedback;
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
@ApiModel("FeedbackByRoomRes")
public class FeedbackByRoomRes{
	@ApiModelProperty(name="특정 스터디에서 자신이 받은 피드백이 모두 담긴 리스트")
	List<FeedbackRes> list;
	
	public static FeedbackByRoomRes of(List<FeedbackRes> list) {
		FeedbackByRoomRes res = new FeedbackByRoomRes();
		res.setList(list);
		return res;
	}
}
