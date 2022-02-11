package com.wish.common.exception.custom.question;

import com.wish.common.exception.ErrorCode;
import com.wish.common.exception.custom.QuestionException;

public class RelationQuestionAddCnt1Exception extends QuestionException{
	
	public RelationQuestionAddCnt1Exception() {
		super(ErrorCode.RELATION_QUESTION_ADD_CNT1);
	}
}
