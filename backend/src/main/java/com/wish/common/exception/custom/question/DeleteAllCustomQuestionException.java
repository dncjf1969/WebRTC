package com.wish.common.exception.custom.question;

import com.wish.common.exception.ErrorCode;
import com.wish.common.exception.custom.QuestionException;

public class DeleteAllCustomQuestionException extends QuestionException{
	
	public DeleteAllCustomQuestionException() {
		super(ErrorCode.DELETEALL_CUSTOM_QUESTION);
	}
}
