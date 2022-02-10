package com.wish.api.service;

import java.util.List;

import com.wish.api.dto.Room;
import com.wish.api.dto.request.RoomCreateReq;
import com.wish.api.dto.request.RoomModifyReq;
import com.wish.api.dto.response.RoomTokenRes;

import io.openvidu.java.client.OpenVidu;

public interface RoomService {

	//key value에 value에 해당하는 roomInfo 리턴해준다.
	public Room getRoom(int roomId);
	
	public List<Room> getRoomList(int roomType);
	
	public void setRoom(Room room);
	
	public void deleteRoom(int roomId);
	
	public RoomTokenRes enterWaitingRoom(int roomId, String password);
	
	public RoomTokenRes createWaitingRoom(RoomCreateReq createInfo, OpenVidu openVidu, int autoIncreament);
	
	public void modifyWaitingRoom(RoomModifyReq modifyInfo);
	
	public void exitWaitingRoom(int roomId, String memberId);
	
	public void exitWaitingRoom(int roomId, String memberId, String nextManager);
	
	public void changeManager(int roomId, String memberId, String nextManager);
	
	public void startMeeting(String memberId, int roomId);
	
	public void finishMeeting(String memberId, int roomId);
}
