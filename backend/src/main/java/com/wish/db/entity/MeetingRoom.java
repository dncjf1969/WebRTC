package com.wish.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.wish.api.dto.Room;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;
import java.text.SimpleDateFormat;

import javax.persistence.Entity;

/**
 * 면접방 모델 정의.
 */
@Entity
@Getter
@Setter
public class MeetingRoom extends BaseEntity{
	// 고유id는 baseEntity에
	// 면접타입, 면접 세부분류, 전체인원, 면접 이름, 면접 날짜, 면접 시작시간, 면접 걸린 시간
	String type;
	String job;
//	int numberMember;
	String name;
	Long startTime;
	Long takenTime;
	
	public static MeetingRoom of(Room room) {
		MeetingRoom meetingRoom = new MeetingRoom();
		meetingRoom.setType(room.getType());
		meetingRoom.setJob(room.getJob());
		meetingRoom.setName(room.getName());
		
		// 현재 시간 저장(시작시간)
		Long startTime = System.currentTimeMillis();
		meetingRoom.setStartTime(startTime);
		
		return meetingRoom;
	}
    
}
