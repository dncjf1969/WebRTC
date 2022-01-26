package com.wish.api.service;


import com.wish.api.request.CustomQuestionCreateReq;
import com.wish.api.request.CustomQuestionUpdateReq;
import com.wish.db.entity.CustomQuestion;
import com.wish.db.entity.Question;

import java.util.List;


public interface CustomQuestionService {

	List<CustomQuestion> readAllCustomQuestionList(String meetingroomId);
	int createCustomQuestion(CustomQuestionCreateReq customQuestionCreateReq);
	int updateCustomQuestion(CustomQuestionUpdateReq customQuestionUpdateReq);
	int deleteCustomQuestion(Long id);
	int deleteAllCustomQuestion(String meetingroomId);

}

