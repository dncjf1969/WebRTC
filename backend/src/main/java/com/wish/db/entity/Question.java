package com.wish.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

/**
 * 기출질문 모델 정의.
 */
@Entity
@Getter
@Setter
public class Question extends BaseEntity{

	String content;
	String type;

	String job;

	int count;	// 선택 횟수
     
}
