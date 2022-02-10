package com.wish.common.exception.custom.question;

import com.wish.common.exception.ErrorCode;
import com.wish.common.exception.custom.QuestionException;

public class DeleteCustomQuestionException extends QuestionException{
	
	public DeleteCustomQuestionException() {
		super(ErrorCode.DELETE_CUSTOM_QUESTION);
	}
}
