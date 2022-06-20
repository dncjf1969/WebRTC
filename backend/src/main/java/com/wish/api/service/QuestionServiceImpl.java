package com.wish.api.service;

import com.wish.api.dto.request.QuestionSelectReq;
import com.wish.common.exception.custom.question.NotFoundQuestionException;
import com.wish.common.exception.custom.question.ReadQuestionException;
import com.wish.db.entity.Question;
import com.wish.db.entity.RelationQuestion;
import com.wish.db.repository.QuestionRepository;
import com.wish.db.repository.RelationQuestionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.Random;


@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    QuestionRepository questionRepository;
    
    @Autowired
    RelationQuestionRepository relationQuestionRepository;
    
    private static final double weightQuestion = 0.4;
    private static final double weightRelation = 0.8;

    public List<Question> readQuestionList(long parentId) {
    	
    	List<Question> resList = null;

		Random rand = new Random();
		float weightRandom;
    	try {
        	if(parentId != -1) {    
            	// 기출질문에서 count기준 2개 뽑는다.
        		resList = questionRepository.findOrderByCountTop10().get();
        		// 가중치 곱하기
        		for (Question question : resList) {
        			weightRandom = (float) ((rand.nextFloat() /2.0)+0.1);
    				question.setCount((question.getCount() * weightQuestion)*weightRandom);
    			}

                // 연관질문 테이블에서 preQuestionId기준으로 질문 뽑는다.    	
        		List<RelationQuestion> relationList = relationQuestionRepository.findTop10ByParentIdOrderByCount(parentId).get();

        		// Question타입으로 변환해서 resList에 추가
        		for (RelationQuestion relationQuestion : relationList) {
        			// 기출질문에서 뽑은 것과 번호가 겹치면 패스한다.
        			if(resList.get(0).getId() == relationQuestion.getChildId() 
        					|| resList.get(1).getId() == relationQuestion.getChildId()) continue;
        			Question now = new Question();
        			now.setId(relationQuestion.getChildId());
        			

        			weightRandom = (float) ((rand.nextFloat() /2.0)+0.1);
        			now.setCount((relationQuestion.getCount() * weightRelation)*weightRandom);
        			resList.add(now);
    			}
        		
        		// 가중치가 곱해진 count 기준 정렬
        		Collections.sort(resList, new Comparator<Question>() {
    				@Override
    				public int compare(Question o1, Question o2) {
    					return (int) ((o1.getCount() - o2.getCount())*10);
    				}
    			});
        		
        		// 상위 두개만 남긴다.
        		resList = resList.subList(0, 2);
        		
        		// 연관질문에서 뽑은 질문은 id만 있는 상태라서 id기준으로 기출테이블에서 조회해 빠진 부분을 채운다.
        		for (Question question : resList) {
    				if(question.getContent()==null || question.getContent().isEmpty()) {
    					Question data = questionRepository.findById(question.getId()).get();
    					question.setContent(data.getContent());
    					question.setType(data.getType());
    					question.setJob(data.getJob());
    				}
    			}
        		
        	}else {	// parentId가 없는 경우 : 첫질문
            	// 기출질문에서 count기준 2개 뽑는다.
        		resList = questionRepository.findOrderByCountTop10().get();
        		
        		for (Question question : resList) {
        			weightRandom = (float) ((rand.nextFloat() /2.0)+0.1);
        			question.setCount((question.getCount() * weightRelation)*weightRandom);
					
				}
        		
        		// 가중치가 곱해진 count 기준 정렬
        		Collections.sort(resList, new Comparator<Question>() {
    				@Override
    				public int compare(Question o1, Question o2) {
    					return (int) ((o1.getCount() - o2.getCount())*10);
    				}
    			});
        		

        		// 상위 두개만 남긴다.
        		resList = resList.subList(0, 2);
        	}
        	
        	// 기출 질문 중 랜덤 1개 선정
        	int size = (int) questionRepository.count() + 1;
        	int randomId = rand.nextInt(size);
        	
        	while(true) {
        		if(resList.get(0).getId() != randomId && resList.get(1).getId() != randomId) break;
        		else randomId = rand.nextInt(size);
        	}
        	
        	Question question = questionRepository.findById((long) randomId).get();
        	resList.add(question);
        	
		} catch (ReadQuestionException e) {
			// TODO: handle exception
			e.printStackTrace();
		}
    	
    	return resList;
    }

    public void selectedQuestionAddCnt1(QuestionSelectReq questionSelectReq){

        Optional<Question> ques = questionRepository.findById(questionSelectReq.getQuestionId());
        
        if(!ques.isPresent()) throw new NotFoundQuestionException(); 	

        Question ques2 = ques.get();
        double temp = ques2.getCount();
        temp++;
        ques2.setCount(temp);
        questionRepository.save(ques2);
    }



}
