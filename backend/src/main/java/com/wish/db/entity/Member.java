package com.wish.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

/**
 * 멤버 모델 정의.
 */
@Entity
@Getter
@Setter
@ToString
public class Member{
    @Id
	String id;

    String name;
    String email;
    
    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String password;
    
    Date signUpDate;
    
    int characterNumber;
    
    @OneToMany(mappedBy = "member")
    List<Role> roles = new ArrayList<>();
    
    public void insertRole(Role role) {
    	this.roles.add(role);
    	role.setMember(this);
    }
    
}