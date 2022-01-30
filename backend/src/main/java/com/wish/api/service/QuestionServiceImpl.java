package com.wish.api.service;

import com.wish.api.dto.request.QuestionSelectReq;
import com.wish.api.dto.request.RelationQuestionUpdateReq;
import com.wish.db.entity.Question;
import com.wish.db.entity.RelationQuestion;
import com.wish.db.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    QuestionRepository questionRepository;

    public List<Question> read20QuestionList() {
        List<Question> questionList = questionRepository.findTop20().get();

        return questionList;
    }

    public int selectedQuestionAddCnt1(QuestionSelectReq questionSelectReq){

        Optional<Question> ques = questionRepository.findById(questionSelectReq.getQuestionId());

        if(ques.isPresent()){
            Question ques2 = ques.get();
            int temp = ques2.getCount();
            temp++;
            ques2.setCount(temp);
            questionRepository.save(ques2);

            return 0;
        }
        else return 1;
    }



}
