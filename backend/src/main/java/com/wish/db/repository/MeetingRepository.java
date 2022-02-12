package com.wish.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.wish.db.entity.MeetingRoom;
import com.wish.db.entity.Member;

import java.util.List;
import java.util.Optional;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface MeetingRepository extends JpaRepository<MeetingRoom, Long> {
    
	// 면접 저장 및 id 반환
	
}