package com.wish.api.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.ValueOperations;

import com.wish.api.dto.Room;

public interface RoomService {

	//key value에 value에 해당하는 roomInfo 리턴해준다.
	public Room getRoom(int roomId);
	
	public List<Room> getRoomList(int roomType);
	
	public void setRoom(Room room);
	
	public void deleteRoom(int roomId);
}
