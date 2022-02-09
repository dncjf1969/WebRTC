package com.wish.api.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.wish.api.dto.Room;


//Redis에 방생성 , 조회, 삭제 등 
@Service
public class RoomService {
	
	@Autowired 
	RedisTemplate<String, Room> redisTemplate;

	
	//key value에 value에 해당하는 roomInfo 리턴해준다.
	public Room getRoom(int roomId) throws JsonMappingException, JsonProcessingException {
		ValueOperations<String, Room> roomValueOperaions = redisTemplate.opsForValue();
		Room room = roomValueOperaions.get(Integer.toString(roomId));
		
		return room;
	}
	
	public List<Room> getRoomList(int roomType){ 
		
		Set<String> s = redisTemplate.keys("*");
		Iterator<String> iter1 = s.iterator();
		
		List<Room> list1 = new ArrayList<Room>();
		
		String type = "";
		if(roomType == 0) type = "인성";
		else if(roomType == 1) type = "직무";
		
		while(iter1.hasNext()) {
			String now = iter1.next();
			if(now.contains("backup")) continue;
			try {
				Room room = getRoom( Integer.parseInt(now));
				if(room.getType().equals(type)) list1.add(room);
				
			} catch (NumberFormatException | JsonProcessingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		return list1;
	}
//	
//	// list (opsForList) 
//	public void setRoomList(String key, Room room){ 
//		redisTemplate.opsForList().rightPushAll(key, room);
//	} 
	
//	public void setRoomList(String key, List<Room> values){ 
//		redisTemplate.opsForList().rightPushAll(key, values);
//	} 
	
	public void setRoom(Room room){
		ValueOperations<String, Room> roomValueOperaions = redisTemplate.opsForValue();
		roomValueOperaions.set(Integer.toString(room.getRoomId()), room);
		redisTemplate.expire(Integer.toString(room.getRoomId()), 60, TimeUnit.MINUTES);
	}
	
	public void deleteRoom(int roomId){
		redisTemplate.delete(Integer.toString(roomId));
	}
	
}
