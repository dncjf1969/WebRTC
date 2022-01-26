package com.wish.api.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WaitingRoom {	
	// OpenVidu에서 발급하는 방 (주소)
	String address;
	
	// 방id => 방 식별에 사용한다., autoIncreament
	int roomId;

	// 방장 id -> 새 멤버를 받으려면 서버를 거쳐야함, 방장은 방 비번과 최대인원을 지정가능
	String manager;
	
	// 방 이름
	String name;

	// 면접 종류
	String type;
	
	// 직무 종류
	String job;
	
	// 참여자 최대인원
	// 면접자로 저장하면 면접관 지정 전에 인원관리가 이상해진다.
	// ex) 면접자 최대,면접관 최대인 경우 역할을 바꾸려면 문제생김
	int memberMax;
	
	// 참여자 현재인원
	int memberCount;
	
	// 방 비밀번호
	String password;
}
