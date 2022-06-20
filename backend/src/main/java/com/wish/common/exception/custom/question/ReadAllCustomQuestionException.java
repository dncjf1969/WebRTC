package com.wish.common.exception.custom.question;

import com.wish.common.exception.ErrorCode;
import com.wish.common.exception.custom.QuestionException;

public class ReadAllCustomQuestionException extends QuestionException{
	
	public ReadAllCustomQuestionException() {
		super(ErrorCode.READALL_CUSTOM_QUESTION);
	}
}
