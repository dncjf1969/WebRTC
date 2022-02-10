package com.wish.api.service;

import com.wish.api.dto.request.FeedbackCreateReq;
import com.wish.api.dto.response.FeedbackRes;
import com.wish.api.dto.response.MeetingCountRes;
import com.wish.db.entity.Feedback;
import com.wish.db.repository.FeedbackRepository;
import com.wish.db.repository.FeedbackRepositorySupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class FeedbackServiceImpl implements FeedbackService {

	@Autowired
	FeedbackRepository feedbackRepository;
	@Autowired
	FeedbackRepositorySupport feedbackRepositorySupport;

	// 사용자 아이디에 해당하는 피드백 가져오기
	@Override
	public List<FeedbackRes> getMyFeedback(String memberId) {
		List<FeedbackRes> res = new ArrayList<FeedbackRes>();
		List<Feedback> feedbackList = feedbackRepository.findByMemberId(memberId);
		
		for (Feedback feedback : feedbackList) {
			res.add(FeedbackRes.of(feedback));
		}
		
		return res;
	}

	@Override
	public boolean createFeedback(FeedbackCreateReq info) {
		try {
			Feedback feedback = new Feedback();
			feedback.setMemberId(info.getMemberId());
			feedback.setMeetingId(info.getMeetingId());
			feedback.setQuestion(info.getQuestion());
			feedback.setComment(info.getComment());
			feedback.setRate(info.getRate());
			
			feedbackRepository.save(feedback);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public boolean deleteFeedback(Long feedbackId) {
		try {
			feedbackRepository.deleteById(feedbackId);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public List<MeetingCountRes> getMyMeetingCounts(String memberId) {
		List<Long> countList = feedbackRepositorySupport.countById(memberId).get();
		List<MeetingCountRes> res = new ArrayList<MeetingCountRes>();
		
		long count = countList.get(0);
		int cnt = (int) count;
		res.add(MeetingCountRes.of("인성",cnt));
		

		count = countList.get(1);
		cnt = (int) count;
		res.add(MeetingCountRes.of("직무",cnt));
		
		return res;
		
	}
}
