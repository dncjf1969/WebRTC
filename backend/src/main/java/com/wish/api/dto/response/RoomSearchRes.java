package com.wish.api.dto.response;

import com.wish.api.dto.Room;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
 * 
 * 방 목록 전달때 WaitingroomListRest의 타입으로 쓰임
 * 
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("WaitingroomSearchRes")
public class RoomSearchRes extends BaseRes{
	@ApiModelProperty(name="방 id", example="12")
	int roomId;
	
	@ApiModelProperty(name="방 이름", example="OO기업 인적성 면접 준비방")
	String name;

	@ApiModelProperty(name="방장", example="joe123")
	String manager;

	@ApiModelProperty(name="면접 종류", example="인적성")
	String type;

	@ApiModelProperty(name="직무 종류", example="인적성")
	String job;
	
	@ApiModelProperty(name="참여자 최대 인원", example="4")
	int memberMax;

	@ApiModelProperty(name="참여자 현재 인원", example="4")
	int memberCount;

	@ApiModelProperty(name="비밀번호 여부", example="true")
	boolean exitPassword;
	
	public static RoomSearchRes of(Room input) {
		RoomSearchRes room = new RoomSearchRes();
		room.setRoomId(input.getRoomId());
		room.setName(input.getName());
		room.setManager(input.getManager());
		room.setType(input.getType());
		room.setJob(input.getJob());
		room.setMemberMax(input.getMemberMax());
		room.setMemberCount(input.getMemberCount());
		
		// 비밀번호가 없거나 공란이면 false, 있으면 true
		if(input.getPassword() == null || input.getPassword().equals("")) room.setExitPassword(false);
		else room.setExitPassword(true);
		
		return room;
	}
}