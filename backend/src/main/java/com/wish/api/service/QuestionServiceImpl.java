package com.wish.api.service;

import com.wish.api.dto.request.QuestionSelectReq;
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


@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    QuestionRepository questionRepository;
    
    @Autowired
    RelationQuestionRepository relationQuestionRepository;
    
    private static final double weightQuestion = 0.4;
    private static final double weightRelation = 0.6;

    public List<Question> readQuestionList(long parentId) {
    	List<Question> resList;
    	if(parentId != -1) {    
        	// 기출질문에서 count기준 4개 뽑는다.
    		resList = questionRepository.findOrderByCountTop4().get();
    		// 가중치 곱하기
    		for (Question question : resList) {
				question.setCount(question.getCount() + weightQuestion);
			}

            // 연관질문 테이블에서 preQuestionId기준으로 질문 뽑는다.    	
    		List<RelationQuestion> relationList = relationQuestionRepository.findTop4ByParentIdOrderByCount(parentId).get();

    		// Question타입으로 변환해서 resList에 추가
    		for (RelationQuestion relationQuestion : relationList) {
    			Question now = new Question();
    			now.setId(relationQuestion.getChildId());
    			now.setCount(relationQuestion.getCount() * weightRelation);
    			resList.add(now);
			}
    		
    		// 가중치가 곱해진 count 기준 정렬
    		Collections.sort(resList, new Comparator<Question>() {
				@Override
				public int compare(Question o1, Question o2) {
					return (int) ((o1.getCount() - o2.getCount())*10);
				}
			});
    		
    		return resList.subList(0, 4);
    		
    	}else {	// parentId가 없는 경우 : 첫질문
        	// 기출질문에서 count기준 4개 뽑는다.
    		return questionRepository.findOrderByCountTop4().get();
    	}
    }

    public int selectedQuestionAddCnt1(QuestionSelectReq questionSelectReq){

        Optional<Question> ques = questionRepository.findById(questionSelectReq.getQuestionId());
        
        if(ques.isPresent()){
            Question ques2 = ques.get();
            double temp = ques2.getCount();
            temp++;
            ques2.setCount(temp);
            questionRepository.save(ques2);

            return 0;
        }
        else return 1;
    }



}
