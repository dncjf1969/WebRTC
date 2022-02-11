package com.wish.common.exception;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;

@Getter
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ErrorCode {
	
	//ROOM
	NOT_FOUND_ROOM(501, "R001", " Room is not Found."),
	LESS_THAN_MAX_MEMBER_ROOM(502, "R002", " Max member is less than now member."),
	PASSWORD_NOT_CORRECT(503, "R003", " Room password is not correct."),
	NOT_ROOM_MASTER(504, "R004", " This member is not room master."),
	
	
	//Question
	CREATE_CUSTOM_QUESTION(501, "Q001", " Custom question create fail."),
	UPDATE_CUSTOM_QUESTION(502, "Q002", " Custom question update fail."),
	DELETE_CUSTOM_QUESTION(503, "Q003", " Custom question delete fail."),
	DELETEALL_CUSTOM_QUESTION(504, "Q004", " Custom question delete all fail."),
	READALL_CUSTOM_QUESTION(505, "Q005", " Custom question read all fail."),
	NOT_FOUND_QUESTION(506, "Q006", " Question is not Found."),
	RELATION_QUESTION_ADD_CNT1(507, "Q007", " Relation question add count Found."),
	READ_QUESTION(508, "Q008", " Question read fail."),
	
	//Feedback
	READ_FEEDBACK(501, "F001", " Feedback read fail"),
	CREATE_FEEDBACK(502, "F002", " Feedback create fail"),
	DELETE_FEEDBACK(503, "F003", " Feedback delete fail"),
	
	//Member
	NOT_FOUND_MEMBER(501, "M001", " Member is not found."),
	EXISTS_MEMBER(502, "M002", " Member already exists."),
	CREATE_MEMBER(503, "M003", " Member create fail."),
	UPDATE_MEMBER(504, "M004", " Member update fail."),
	DELETE_MEMBER(505, "M005", " Member delete fail."),
	EMAIL_NOT_CORRECT(506, "M006", " Member email is not same."),
	LOGIN_MEMBER(507, "M007", " Member login fail.");
	
	
	private final int statusCode;
	private final String errorCode;
	private final String message;
	
	ErrorCode(final int statusCode, final String errorCode, final String message) {
		// TODO Auto-generated constructor stub
		this.statusCode = statusCode;
		this.errorCode = errorCode;
		this.message = message;
	}

	
}
