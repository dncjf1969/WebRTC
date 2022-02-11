package com.wish.db.repository;

import com.google.common.base.Optional;
import com.wish.api.dto.response.MeetingCountRes;
import com.wish.db.entity.Feedback;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 피드백 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 * 반환 타입 지정해야하면 여기 정의
 */
@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
	List<Feedback> findByMemberId(String memberId);
	
	Optional<List<Long>> countByMemberId(String id);
	
	
}