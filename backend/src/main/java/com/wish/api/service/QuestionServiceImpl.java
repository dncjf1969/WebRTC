package com.wish.api.service;

import com.wish.db.entity.Question;
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


}
