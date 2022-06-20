package com.wish.api.service;

import com.wish.api.dto.request.CustomQuestionCreateReq;
import com.wish.api.dto.request.CustomQuestionUpdateReq;
import com.wish.common.exception.custom.question.CreateCustomQuestionException;
import com.wish.common.exception.custom.question.DeleteAllCustomQuestionException;
import com.wish.common.exception.custom.question.DeleteCustomQuestionException;
import com.wish.common.exception.custom.question.ReadAllCustomQuestionException;
import com.wish.common.exception.custom.question.UpdateCustomQuestionException;
import com.wish.db.entity.CustomQuestion;
import com.wish.db.repository.CustomQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CustomQuestionServiceImpl implements CustomQuestionService {

	@Autowired
	CustomQuestionRepository customQuestionRepository;

	@Override
	public List<CustomQuestion> readAllCustomQuestionList(String meetingroomId){
		
		List<CustomQuestion> temp_list = null;
		try {
			temp_list = customQuestionRepository.findByMeetingroomId(meetingroomId);
			
		} catch (ReadAllCustomQuestionException e) {
			// TODO: handle exception
			e.printStackTrace();
		}

		return temp_list;
	}

	@Override
	public void createCustomQuestion(CustomQuestionCreateReq customQuestionCreateReq){
		
		try {
			CustomQuestion customQuestion = new CustomQuestion();
			customQuestion.setMeetingroomId(customQuestionCreateReq.getMeetingroomId());
			customQuestion.setContent(customQuestionCreateReq.getContent());

			customQuestionRepository.save(customQuestion);
		} catch ( CreateCustomQuestionException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void updateCustomQuestion(CustomQuestionUpdateReq customQuestionUpdateReq){
		
		try {
			CustomQuestion customQuestion = customQuestionRepository.findById(customQuestionUpdateReq.getId()).get();
			customQuestion.setContent(customQuestionUpdateReq.getContent());

			customQuestionRepository.save(customQuestion);
		} catch (UpdateCustomQuestionException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void deleteCustomQuestion(Long id){

		try {
			CustomQuestion customQuestion = customQuestionRepository.findById(id).get();
			customQuestionRepository.delete(customQuestion);

		} catch (DeleteCustomQuestionException e) {
			e.printStackTrace();
		}

	}

	@Override
	public void deleteAllCustomQuestion(String meetingroomId){

		try {
			List<CustomQuestion> temp_list = customQuestionRepository.findByMeetingroomId(meetingroomId);
			customQuestionRepository.deleteAll(temp_list);
			
		} catch (DeleteAllCustomQuestionException e) {
			e.printStackTrace();
		}

	}
}
