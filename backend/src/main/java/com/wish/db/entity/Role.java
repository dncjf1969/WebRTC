package com.wish.db.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class Role extends BaseEntity{

//	String memberId;
	String role;
	
	@ManyToOne
	@JoinColumn(name = "Member_Id") 
	private Member member;
}

