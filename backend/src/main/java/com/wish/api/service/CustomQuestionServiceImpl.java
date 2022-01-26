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

	@Override
	public List<Question> readQuestionList(){

//		List<Question> temp = questionRepository.fi

	}

	@Override
	public int createCustomQuestion(Long meetingroomId, String content){

		questionRepository.save()

		return 0;
	}

	@Override
	public int updateCustomQuestion(){

		return 0;
	}

	@Override
	public int deleteCustomQuestion(){

		return 0;
	}

	@Override
	public int deleteAllCustomQuestion(){

		return 0;
	}
}
