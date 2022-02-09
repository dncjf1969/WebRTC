package com.wish.db.repository;

import com.wish.db.entity.Question;
import com.wish.db.entity.RelationQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface RelationQuestionRepository extends JpaRepository<RelationQuestion, Long> {
    // 아래와 같이, Query Method 인터페이스(반환값, 메소드명, 인자) 정의를 하면 자동으로 Query Method 구현됨.

	// parentId가 일치하느 것 중 count 기준 상위 4개 -> 기출과 곂칠걸 고려해서 2배로 선택
    Optional<List<RelationQuestion>> findTop4ByParentIdOrderByCount(Long parentId);
    Optional<RelationQuestion> findByParentIdAndChildId(Long parentId, Long childId);


//    //jpql
//    @Query(value = "select * from member where id = ?1 and name = ?2", nativeQuery = true)
//    Optional<Member> find2(String id, String name);
}