package com.wish.api.service;

import com.querydsl.core.Tuple;
import com.wish.api.dto.request.FeedbackCreateReq;
import com.wish.api.dto.response.FeedbackRes;
import com.wish.common.exception.custom.feedback.CreateFeedbackException;
import com.wish.common.exception.custom.feedback.DeleteFeedbackException;
import com.wish.common.exception.custom.feedback.ReadFeedbackException;
import com.wish.api.dto.response.MeetingCountRes;
import com.wish.db.entity.Feedback;
import com.wish.db.entity.MeetingRoom;
import com.wish.db.entity.Member;
import com.wish.db.entity.Question;
import com.wish.db.repository.FeedbackRepository;
import com.wish.db.repository.FeedbackRepositorySupport;
import com.wish.db.repository.MeetingRepository;
import com.wish.db.repository.MemberRepository;
import com.wish.db.repository.QuestionRepository;

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
	@Autowired
	MeetingRepository meetingRepository;
	@Autowired
	MemberRepository memberRepository;
	@Autowired
	QuestionRepository questionRepository;

	// 사용자 아이디에 해당하는 피드백 가져오기
//	@Override
//	public List<FeedbackRes> getMyFeedback(String memberId) {
//		List<FeedbackRes> res = new ArrayList<FeedbackRes>();
//
//		try {
//			List<Feedback> list = feedbackRepository.findByMemberId(memberId).get();
//
//			for (Feedback feedback : list) {
//				res.add(FeedbackRes.of(feedback));
//			}
//
//		} catch (ReadFeedbackException e) {
//			// TODO: handle exception
//			e.printStackTrace();
//		}
//
//		return res;
//	}

	@Override
	public void createFeedback(FeedbackCreateReq info) {
		try {
			Feedback feedback = new Feedback();
//			feedback.setMemberId(info.getMemberId());
//			feedback.setMeetingId(info.getMeetingId());
			feedback.setQuestion(info.getQuestion());
			feedback.setComment(info.getComment());
			feedback.setRate(info.getRate());
			feedback.setType(info.getType());
			
			Member member = memberRepository.findById(info.getMemberId()).get();
			feedback.setMember(member);
			
			MeetingRoom meetingRoom = meetingRepository.findById(info.getMeetingId()).get();
			feedback.setMeetingRoom(meetingRoom);
			
			feedbackRepository.save(feedback);
		} catch ( CreateFeedbackException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void deleteFeedback(Long feedbackId) {
		try {
			feedbackRepository.deleteById(feedbackId);
		} catch (DeleteFeedbackException e) {
			e.printStackTrace();
		}
	}

	@Override
	public List<MeetingCountRes> getMyMeetingCounts(String memberId) {
		List<MeetingCountRes> res = feedbackRepositorySupport.countById(memberId).get();
		
		return res;
	}

	@Override
	public List<Long> getMeetingIdList(String memberId) {
		List<Long> res = feedbackRepositorySupport.findDistinctByMemberId(memberId).get();
		
		return res;
	}

	@Override
	public List<FeedbackRes> getMyFeedbackByRoom(Long roomId, String memberId) {
		List<Feedback> list = feedbackRepository.findByMeetingRoomAndMemberId(roomId, memberId).get();
//		List<Feedback> list = new ArrayList<Feedback>();
		List<FeedbackRes> res = new ArrayList<FeedbackRes>();

		// 타입 변환
		for (Feedback feedback : list) {
			res.add(new FeedbackRes().of(feedback));
		}
		
		return res;
	}
}
