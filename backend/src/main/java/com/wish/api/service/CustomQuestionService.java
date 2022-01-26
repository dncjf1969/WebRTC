package com.wish.api.service;


import com.wish.db.entity.Question;

import java.util.List;


public interface QuestionService {

	List<Question> readQuestionList();
	int createCustomQuestion(Long meetingroomId, String content);
	int updateCustomQuestion();
	int deleteCustomQuestion();
	int deleteAllCustomQuestion();

}

