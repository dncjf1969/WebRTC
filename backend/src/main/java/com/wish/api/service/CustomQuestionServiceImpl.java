package com.wish.api.service;

import com.wish.api.request.CustomQuestionCreateReq;
import com.wish.api.request.CustomQuestionUpdateReq;
import com.wish.db.entity.CustomQuestion;
import com.wish.db.entity.Question;
import com.wish.db.repository.CustomQuestionRepository;
import com.wish.db.repository.CustomQuestionRepositorySupport;
import com.wish.db.repository.MemberRepository;
import com.wish.db.repository.MemberRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class CustomQuestionServiceImpl implements CustomQuestionService {

	@Autowired
	CustomQuestionRepository customQuestionRepository;

	@Override
	public List<CustomQuestion> readAllCustomQuestionList(String meetingroomId){
		List<CustomQuestion> temp_list = customQuestionRepository.findByMeetingroomId(meetingroomId);

		return temp_list;
	}

	@Override
	public int createCustomQuestion(CustomQuestionCreateReq customQuestionCreateReq){


		CustomQuestion customQuestion = new CustomQuestion();
		customQuestion.setMeetingroomId(customQuestionCreateReq.getMeetingroomId());
		customQuestion.setContent(customQuestionCreateReq.getContent());

		customQuestionRepository.save(customQuestion);

		return 0;
	}

	@Override
	public int updateCustomQuestion(CustomQuestionUpdateReq customQuestionUpdateReq){

		CustomQuestion customQuestion = customQuestionRepository.findById(customQuestionUpdateReq.getId()).get();
		customQuestion.setContent(customQuestionUpdateReq.getContent());

		customQuestionRepository.save(customQuestion);

		return 0;
	}

	@Override
	public int deleteCustomQuestion(Long id){

		CustomQuestion customQuestion = customQuestionRepository.findById(id).get();
		customQuestionRepository.delete(customQuestion);

		return 0;
	}

	@Override
	public int deleteAllCustomQuestion(String meetingroomId){

		List<CustomQuestion> temp_list = customQuestionRepository.findByMeetingroomId(meetingroomId);

		customQuestionRepository.deleteAll(temp_list);
		return 0;
	}
}
