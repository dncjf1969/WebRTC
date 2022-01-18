package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
public class WaitingRoom  extends BaseEntity{

	// 방 이름, 참여자1, 참여자2, 참여자3, 참여자4, 참여자5, 참여자6, 방장, 현재인원수
	String name;
	String memeber1;
	String memeber2;
	String memeber3;
	String memeber4;
	String memeber5;
	String memeber6;
	String manager;
	int count;
	
	//방 세팅
	// 면접종류, 최대 인원 수(2~6), 방 비밀번호
	String type;
	int maxMember;
	int password;
     
}
