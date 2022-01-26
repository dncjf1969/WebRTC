package com.wish.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.wish.db.entity.Member;
import com.wish.db.entity.QMember;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class CustomQuestionRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QMember qMember = QMember.member;

    public Optional<Member> findById(String id) {
    	Member member = jpaQueryFactory.select(qMember).from(qMember)
                .where(qMember.id.eq(id)).fetchOne();
        if(member == null) return Optional.empty();
        return Optional.ofNullable(member);
    }
    
}
