package com.wish.common.exception.custom.question;

import com.wish.common.exception.ErrorCode;
import com.wish.common.exception.custom.QuestionException;

public class ReadQuestionException extends QuestionException{
	
	public ReadQuestionException() {
		super(ErrorCode.READ_QUESTION);
	}
}
