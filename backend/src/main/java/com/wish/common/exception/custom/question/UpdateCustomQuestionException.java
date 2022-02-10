package com.wish.common.exception.custom.question;

import com.wish.common.exception.ErrorCode;
import com.wish.common.exception.custom.QuestionException;

public class UpdateCustomQuestionException extends QuestionException{
	
	public UpdateCustomQuestionException() {
		super(ErrorCode.UPDATE_CUSTOM_QUESTION);
	}
}
