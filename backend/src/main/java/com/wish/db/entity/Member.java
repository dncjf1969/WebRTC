package com.wish.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.sql.Date;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * 멤버 모델 정의.
 */
@Entity
@Getter
@Setter
public class Member{
    @Id
	String id;
    String name;
    String email;
    
    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String password;
    
    Date signUpDate;
    
    //이렇게 추가해줘야할듯.
    @ElementCollection(targetClass=String.class)
    List<String> role = new ArrayList<String>();

    
}
