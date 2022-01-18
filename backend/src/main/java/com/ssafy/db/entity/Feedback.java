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
public class Feedback  extends BaseEntity{
	// 스터디 날짜, 시작시간, 스터디 이름, 스터디id, 평가받는 유저 아이디, 질문, 평가점수, 평가하는 유저 아이디
	String meetingroomId;
	String memberId;
	String question;
	float rate;	
     
}
