package com.wish.db.entity;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 * 피드백 모델 정의.
 */
@Entity
@Getter
@Setter
public class Feedback  extends BaseEntity{
    // 스터디 이름, 평가받는 유저 아이디, 질문, 평가점수, 평가내용, 스터디 날짜, 시작시간, 면접 종류

//    Long meetingId;
//    String memberId;
    String meetingName;
    String question;
    String type;
    float rate;
    String comment;
    Date date;
    Time time;

	@ManyToOne
	@JoinColumn(name = "meeting_id")
	private MeetingRoom meetingRoom;

	@ManyToOne
	@JoinColumn(name = "member_id") 
	private Member member;    


//	다대일이 아니라 다대영이 될 수 도 있어서 관계 제외
//	@ManyToOne
//	@JoinColumn(name = "Question_Id") 
//	private Question questionObj;

}