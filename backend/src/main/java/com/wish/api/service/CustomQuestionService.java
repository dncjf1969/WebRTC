package com.wish.api.service;


import com.wish.api.dto.request.CustomQuestionCreateReq;
import com.wish.api.dto.request.CustomQuestionUpdateReq;
import com.wish.db.entity.CustomQuestion;
import com.wish.db.entity.Question;

import java.util.List;


public interface CustomQuestionService {

	List<CustomQuestion> readAllCustomQuestionList(String meetingroomId);
	void createCustomQuestion(CustomQuestionCreateReq customQuestionCreateReq);
	void updateCustomQuestion(CustomQuestionUpdateReq customQuestionUpdateReq);
	void deleteCustomQuestion(Long id);
	void deleteAllCustomQuestion(String meetingroomId);



}

