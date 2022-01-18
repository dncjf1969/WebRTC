package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;

import javax.persistence.Entity;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
public class MeetingRoom  extends BaseEntity{

	// 참가자1~6,  면접관1~2,
	String memeber1;
	String memeber2;
	String memeber3;
	String memeber4;
	String memeber5;
	String memeber6;
	String director1;
	String director2;
	
	// 스터디 날짜, 시작시간, 대기방 번호
	Date date;
	Time time;
	Long waitingroomId;
	

     
}
