package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

import java.sql.Time;

import javax.persistence.Entity;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
public class Chat extends BaseEntity{

	// 대기방마다->방폭되면 챗도 없어짐 
	// 대기방번호, 채팅입력한사람, 채팅내용, 시간
	Long waitingroomId;
	String memberId;
	String content;
	Time time;
     
}
