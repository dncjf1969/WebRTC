package com.wish.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

/**
 * 연관질문 모델 정의.
 * 연관질문 : 질문간 선후행 관계
 * 		 : 질문 추천 알고리즘에 사용된다.
 */
@Entity
@Getter
@Setter
public class RelationQuestion extends BaseEntity{

	Long parentId;	// 부모질문
	Long childId;	// 자식질문
	double count;		// 횟수
     
}
