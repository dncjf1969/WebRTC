package com.wish.db.repository;

import com.google.common.base.Optional;
import com.wish.db.entity.Feedback;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 피드백 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 * 반환 타입 지정해야하면 여기 정의
 */
@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

//	Optional<List<Feedback>> findByMeetingIdAndMemberId(Long meetingId, String memberId);
//	Optional<List<Feedback>> findByMeetingRoomAndMemberId(Long meetingId, String memberId);
	
//	 @Query("select o from Order o join o.lineItems item where item.product.id = :productId")
//	  List<Order> findByProductId(@Param("productId") Long productId);
	 @Query(value = "select f "
	 		+ "from Feedback f "
	 		+ "left join f.meetingId meeting "
	 		+ "left join f.memberId member "
	 		+ "where meeting.meetingId = :meetingId "
	 		+ "where member.memberId = :memberId"
	 		, nativeQuery = true)
	 Optional<List<Feedback>> findByMeetingIdAndMemberId(@Param("meetingId") Long meetingId, @Param("memberId")String memberId);
	
	Optional<List<Long>> countByMemberId(String id);
	
	
}