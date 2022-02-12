package com.wish.api.service;

import com.wish.api.dto.request.FeedbackCreateReq;
import com.wish.api.dto.response.MeetingCountRes;
import com.wish.api.dto.response.FeedbackRes;

import java.util.List;


public interface FeedbackService {

//	List<FeedbackRes> getMyFeedback(String memberId);
	List<FeedbackRes> getMyFeedbackByRoom(Long roomId, String memberId);
	List<MeetingCountRes> getMyMeetingCounts(String memberId);
	List<Long> getMeetingIdList(String memberId);
	
	void createFeedback(FeedbackCreateReq info);
	void deleteFeedback(Long feedbackId);

}

