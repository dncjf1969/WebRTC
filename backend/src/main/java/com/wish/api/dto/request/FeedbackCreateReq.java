package com.wish.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("FeedbackCreateReq")
public class FeedbackCreateReq {
	@ApiModelProperty(name="피드백 받는 사용자 id", example="chris1225")
	String memberId;

	@ApiModelProperty(name="면접 id", example="5")
	Long meetingId;

	@ApiModelProperty(name="면접 종류", example="인성")
	String type;
	
	@ApiModelProperty(name="질문 내용", example="00기업 인턴을 했다고 하셨는데 거기서 어떤 업무를 하셨죠?")
	String question;

	@ApiModelProperty(name="피드백 내용", example="인턴경험을 통한 업무 파악 능력을 잘 보여줌")
	String comment;

	@ApiModelProperty(name="피드백 점수", example="3.5")
	float rate;
	

}
