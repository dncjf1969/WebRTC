package com.wish.common.exception.custom.feedback;

import com.wish.common.exception.ErrorCode;
import com.wish.common.exception.custom.FeedbackException;

public class CreateFeedbackException extends FeedbackException{
	
	public CreateFeedbackException() {
		super(ErrorCode.CREATE_FEEDBACK);
	}
}
