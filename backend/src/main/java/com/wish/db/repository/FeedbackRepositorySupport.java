package com.wish.db.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.wish.api.dto.response.MeetingCountRes;
import com.wish.db.entity.Feedback;
import com.wish.db.entity.QFeedback;

import java.util.List;
import java.util.Optional;

import org.hibernate.criterion.Projection;
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
    
 // 별칭으로 정렬하려면 Path<>로 정렬할 컬럼을 선언한 후, as로 받아야
    NumberPath<Long> count = Expressions.numberPath(Long.class, "count");
    
    public Optional<List<MeetingCountRes>> countById(String id) {
    	List<MeetingCountRes> meetingCount =  jpaQueryFactory
    				.select(Projections.bean(MeetingCountRes.class, qFeedback.type, qFeedback.id.count().as(count)))
    									.from(qFeedback)
//    									.where(qFeedback.memberId.eq(id))
				.where(qFeedback.member.id.eq(id))
    									.groupBy(qFeedback.type)
    									.fetch();

    	return Optional.ofNullable(meetingCount);
    }
    
    public Optional<List<Long>> findDistinctByMemberId(String memberId) {
    	List<Long> list =  jpaQueryFactory
    							.selectDistinct(qFeedback.meetingRoom.id)
								.from(qFeedback)
//								.where(qFeedback.memberId.eq(memberId))
				.where(qFeedback.member.id.eq(memberId))
								.fetch();

    	return Optional.ofNullable(list);
    }
}
