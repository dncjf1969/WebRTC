package com.wish.common.exception.custom.feedback;

import com.wish.common.exception.ErrorCode;
import com.wish.common.exception.custom.FeedbackException;

public class ReadFeedbackException extends FeedbackException{
	
	public ReadFeedbackException() {
		super(ErrorCode.READ_FEEDBACK);
	}
}
