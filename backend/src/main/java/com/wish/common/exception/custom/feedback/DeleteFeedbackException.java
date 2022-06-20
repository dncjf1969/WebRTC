package com.wish.common.exception.custom.feedback;

import com.wish.common.exception.ErrorCode;
import com.wish.common.exception.custom.FeedbackException;

public class DeleteFeedbackException extends FeedbackException{
	
	public DeleteFeedbackException() {
		super(ErrorCode.DELETE_FEEDBACK);
	}
}
