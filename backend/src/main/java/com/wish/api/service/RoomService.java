package com.wish.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wish.api.dto.Room;


//Redis에 방생성 , 조회, 삭제 등 
@Service
public class RoomService {
	
	@Autowired
	RedisTemplate<String, String> redisTemplate;
	
	//key value에 value에 해당하는 roomInfo 리턴해준다.
	public Room getRoom(int roomId) throws JsonMappingException, JsonProcessingException {
		
		ValueOperations<String, String> vop = redisTemplate.opsForValue();
		String roomInfo = vop.get(Integer.toString(roomId));
		
		ObjectMapper mapper =new ObjectMapper();
		JsonNode node = mapper.readTree(roomInfo);
		Integer memberCount = node.get("memberCount").asInt();
		Integer memberMax = node.get("memberMax").asInt();
		String password2 = node.get("password").asText();
		String token = node.get("token").asText();
		
		Room room = new Room(token, roomId, node.get("manager").asText(), node.get("name").asText(), node.get("type").asText(), node.get("job").asText(), memberMax, memberCount, password2, node.get("nowMeeting").asBoolean());
		return room;
	}
	
	public void setRoom(Room room){
		ValueOperations<String, String> vop2 = redisTemplate.opsForValue();
		System.out.println("?");
		//리스트에 다시 저장.
		vop2.set(Integer.toString(room.getRoomId()), room.toString());
	}
	
//	public void deleteRoom(int roomId){
//		ValueOperations<String, String> vop2 = redisTemplate.opsForValue();
//		
//		vop2.d;
//		//리스트에 다시 저장.
//		vop2.set(Integer.toString(room.getRoomId()), room.toString());
//	}
//	
}
