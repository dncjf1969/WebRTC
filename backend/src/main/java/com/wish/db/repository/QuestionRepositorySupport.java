package com.wish.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.wish.db.entity.Member;
import com.wish.db.entity.QMember;
import com.wish.db.entity.QQuestion;
import com.wish.db.entity.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class QuestionRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QQuestion qQuestion = QQuestion.question;
//
//    public Optional<List<Question>> findTop20(){
//        List<Question> list = jpaQueryFactory.select(qQuestion).from(qQuestion)
//                .limit(2).fetch();
//        if(list == null) return Optional.empty();
//        return Optional.ofNullable(list);
//    }
    
}
