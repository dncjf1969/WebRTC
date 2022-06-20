package com.wish.common.exception.custom.question;

import com.wish.common.exception.ErrorCode;
import com.wish.common.exception.custom.QuestionException;

public class CreateCustomQuestionException extends QuestionException{
	
	public CreateCustomQuestionException() {
		super(ErrorCode.CREATE_CUSTOM_QUESTION);
	}
}
