package com.wish.api.service;


import com.wish.api.dto.request.RelationQuestionUpdateReq;
import com.wish.db.entity.Question;

import java.util.List;


public interface RelationQuestionService {

    void relationQuestionAddCnt1(RelationQuestionUpdateReq relationQuestionUpdateReq);

}

