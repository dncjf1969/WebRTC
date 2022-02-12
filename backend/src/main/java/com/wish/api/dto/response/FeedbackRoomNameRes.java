package com.wish.api.dto.response;

import com.wish.db.entity.Feedback;
import com.wish.db.entity.Member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 면접 ID와 면접 이름을 저장함 
 */
@Getter
@Setter
@ApiModel("FeedbackRoomNameRes")
public class FeedbackRoomNameRes{	
	@ApiModelProperty(name="면접 id", example="chris1225")
	Long meetingId;

	@ApiModelProperty(name="면접 이름", example="chris1225")
	String meetingName;
	
	public static FeedbackRoomNameRes of(Feedback feedback) {
		FeedbackRoomNameRes res = new FeedbackRoomNameRes();
		res.setMeetingId(feedback.getMeetingId());
		res.setMeetingName(feedback.getMeetingName());
		return res;
	}
}
