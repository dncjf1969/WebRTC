package com.ssafy.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Test2 extends BaseEntity{
	
	@Column(name="name_test")
	String name;
	
	//@Column 꼭 안해도 됨.
	//@Column에서 지정한 변수명과 데이터베이스의 컬럼명을 서로 다르게 주고 싶다면 @Column(name=" ") 
	@Column(name="age_test")
	int age;
	
	@JsonIgnore
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	String email;
	
	
}


