package com.wish.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.wish.api.dto.response.MeetingCountRes;
import com.wish.db.entity.Member;
import com.wish.db.entity.QFeedback;
import com.wish.db.entity.QMember;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class FeedbackRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QFeedback qFeedback = QFeedback.feedback;

//    public Optional<Integer> countById(String id) {
//    	Member member = jpaQueryFactory.select(qMember).from(qMember)
//                .where(qMember.id.eq(id)).fetchOne();
//        if(member == null) return Optional.empty();
//        return Optional.ofNullable(member);
//    }
    
    public Optional<List<Long>> countById(String id) {
    	List<Long> meetingCount =  jpaQueryFactory.select(qFeedback.count())
    									.from(qFeedback)
    									.where(qFeedback.memberId.eq(id))
    									.groupBy(qFeedback.type)
    									.fetch();

    	return Optional.ofNullable(meetingCount);
    }
}
