package com.wish.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

/**
 * 참여했던 면접방 기록 모델 정의.
 */
@Entity
@Getter
@Setter
public class RoomHistory extends BaseEntity{
	// N:M관계 사이에 생기는 테이블
	// 미팅방 id, 참여멤버id, 역할
	Long meetingroomId;
	String memberId;
	String role;
     
}
