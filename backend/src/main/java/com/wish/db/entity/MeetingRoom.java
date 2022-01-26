package com.wish.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;

import javax.persistence.Entity;

/**
 * 면접방 모델 정의.
 */
@Entity
@Getter
@Setter
public class MeetingRoom extends BaseEntity{
	// 고유id는 baseEntity에
	// 면접타입, 전체인원, 면접관 수, 면접 날짜, 면접 시작시간, 면접 걸린 시간
	String type;
	int numberMember;
	int numberInterviewer;
	Date date;
	Time startTime;
	Time takenTime;
     
}
