package com.wish.api.dto.response;

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
@ApiModel("FeedbackRes")
public class FeedbackRes{
	@ApiModelProperty(name="피드백 id", example="348")
	Long id;
	
	@ApiModelProperty(name="스터디 id", example="chris1225")
	Long meetingId;

	@ApiModelProperty(name="스터디 이름", example="SSAFY 코치 면접 준비")
	String meetingName;
	
	@ApiModelProperty(name="질문 내용", example="00기업 인턴을 했다고 하셨는데 거기서 어떤 업무를 하셨죠?")
	String question;

	@ApiModelProperty(name="피드백 내용", example="chris1225")
	String comment;

	@ApiModelProperty(name="피드백 점수", example="3.5")
	float rate;
	
	public static FeedbackRes of(Feedback feedback) {
		FeedbackRes res = new FeedbackRes();
		res.setId(feedback.getId());
		res.setMeetingId(feedback.getMeetingRoom().getId());
		res.setMeetingName(feedback.getMeetingRoom().getName());
		res.setQuestion(feedback.getQuestion());
		res.setComment(feedback.getComment());
		res.setRate(feedback.getRate());
		return res;
	}
}
