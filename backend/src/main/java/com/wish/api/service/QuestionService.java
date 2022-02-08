package com.wish.api.service;


import com.wish.api.dto.request.QuestionSelectReq;
import com.wish.api.dto.request.RelationQuestionUpdateReq;
import com.wish.db.entity.Question;

import java.util.List;


public interface QuestionService {

    List<Question> readQuestionList();

    int selectedQuestionAddCnt1(QuestionSelectReq questionSelectReq);

}

