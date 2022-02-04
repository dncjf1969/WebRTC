package com.wish.api.service;

import com.wish.api.dto.request.FeedbackCreateReq;
import com.wish.api.dto.response.FeedbackRes;

import java.util.List;


public interface FeedbackService {

	List<FeedbackRes> getMyFeedback(String memberId); 
	
	boolean createFeedback(FeedbackCreateReq info);
	boolean deleteFeedback(Long feedbackId);

}

