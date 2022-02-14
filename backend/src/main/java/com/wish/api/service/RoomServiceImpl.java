package com.wish.api.service;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.wish.api.dto.Room;
import com.wish.api.dto.request.RoomCreateReq;
import com.wish.api.dto.request.RoomManagerReq;
import com.wish.api.dto.request.RoomModifyReq;
import com.wish.api.dto.response.BaseRes;
import com.wish.api.dto.response.RoomTokenRes;
import com.wish.common.exception.custom.room.IsNotRoomManagerException;
import com.wish.common.exception.custom.room.NotFoundRoomException;
import com.wish.common.exception.custom.room.RoomMemberUnderMaxMemberCntException;
import com.wish.common.exception.custom.room.RoomPasswordIsNotCorrectException;
import com.wish.db.entity.MeetingRoom;
import com.wish.db.repository.MeetingRepository;

import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.ConnectionType;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.OpenViduRole;
import io.openvidu.java.client.Session;


//Redis에 방생성 , 조회, 삭제 등 
@Service
public class RoomServiceImpl implements RoomService{
	
	@Autowired 
	RedisTemplate<String, Room> redisTemplate;
	
	@Autowired
	MeetingRepository meetingRepository; 
	


	//key value에 value에 해당하는 roomInfo 리턴해준다.
	public Room getRoom(int roomId) {
		ValueOperations<String, Room> roomValueOperaions = redisTemplate.opsForValue();
		Room room = roomValueOperaions.get(Integer.toString(roomId));
		
		if(room == null) throw new NotFoundRoomException(roomId);
		
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
			if(now.contains("turn")) continue;
			try {
				Room room = getRoom(Integer.parseInt(now));
				if(room.getType().equals(type)) list1.add(room);
				
			} catch (NumberFormatException e) {
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
	
	public RoomTokenRes createWaitingRoom(RoomCreateReq createInfo, OpenVidu openVidu, int autoIncreament) {
		// OpenViduRole : https://docs.openvidu.io/en/stable/api/openvidu-node-client/enums/openvidurole.html
		// MODERATOR / PUBLISHER / SUBSCRIBER
		OpenViduRole role = OpenViduRole.PUBLISHER;
		
		// 세션에 참여한 다른 참여자들에게 전달할 추가 정보
		// 이름을 전달한다.
		String serverData = "{\"serverData\": \"" + createInfo.getName() + "\"}";

		// ConnectionProperties : https://docs.openvidu.io/en/stable/api/openvidu-node-client/interfaces/connectionproperties.html
		ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
				.type(ConnectionType.WEBRTC)	// 연결 타입  WEBRTC / IPCAM
				.role(role)						// role : 역할(권한)
				.data(serverData)				// data : 닉네임같은 사용자에 대한 일부 데이터
				.record(true)					// 녹화 => https://docs.openvidu.io/en/2.20.0/advanced-features/recording/#how-to-record-sessions
				.build();
		
		// 방 생성
		Session session;
		try {
			// 주소가 들어간다 wss://192.~	
			session = openVidu.createSession();
			String token = session.createConnection(connectionProperties).getToken();
			
			Room room = Room.of(token, autoIncreament, createInfo);
			
			System.out.println(room.toString());
			//redis에 방 정보 추가.
			setRoom(room);
			
			// 클라이언트에 토큰(주소) 전달
			RoomTokenRes res = RoomTokenRes.of(token,room.getRoomId());
			
			return res;
			
		} catch (OpenViduJavaClientException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (OpenViduHttpException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
			
		return null;
	}
	
	public RoomTokenRes enterWaitingRoom(int roomId, String password) {
		
		Room room = getRoom(roomId);
				
		// 최대인원 확인
		if(room.getMemberCount() >= room.getMemberMax()) { throw new RoomMemberUnderMaxMemberCntException();}
		// 비밀번호 일치여부 확인
		if(!room.getPassword().equals(password)) { throw new RoomPasswordIsNotCorrectException();}
		
		
		int nowMemberCnt = room.getMemberCount();
		room.setMemberCount(nowMemberCnt+1);
		setRoom(room);
		
		return RoomTokenRes.of(room.getToken(), roomId);
	}
	
	public void modifyWaitingRoom(RoomModifyReq modifyInfo) {
		int roomId = modifyInfo.getRoomId();
		
		Room room = getRoom(roomId);
			
		// 현재 참여자가 6인데 최대 참여인원을 5로 바꾸면 에러			
		if(room.getMemberCount() > modifyInfo.getMemberMax()) { throw new RoomMemberUnderMaxMemberCntException();}
			
		// 정보 수정
		room.setName(modifyInfo.getName());
		room.setType(modifyInfo.getType());
		room.setJob(modifyInfo.getJob());
		room.setMemberMax(modifyInfo.getMemberMax());
		room.setPassword(modifyInfo.getPassword());
		
		setRoom(room);
	}
	
	public void exitWaitingRoom(int roomId, String memberId) {
		Room room = getRoom(roomId);
		
		// 인원수 -1
		room.setMemberCount(room.getMemberCount()-1);
		
		setRoom(room);
		
		// 인원수 0이면 목록에서 방 제거
		if(room.getMemberCount() == 0) deleteRoom(roomId);
	}
	
	public void exitWaitingRoom(int roomId, String memberId, String nextManager) {
		Room room = getRoom(roomId);
		
		// 나가려는게 방장이면 클라이언트에서 지정된 다음 방장으로 변경
		changeManager(roomId, memberId, nextManager);
			
		// 인원수 -1
		room.setMemberCount(room.getMemberCount()-1);
		setRoom(room);
		
		// 인원수 0이면 목록에서 방 제거
		if(room.getMemberCount() == 0) deleteRoom(roomId);
	}
	
	public void changeManager(int roomId, String memberId, String nextManager) {

		Room room = getRoom(roomId);
		
		// 현재 방장아이디와 입력받은 현재방장 아이디 같아야함.
		if(!memberId.equals(room.getManager())) throw new IsNotRoomManagerException(memberId);
		
		room.setManager(nextManager);
		
		setRoom(room);
		
	}

	public Long startMeeting(String memberId, int roomId) {
		/*
		 * Redis 데이터를  면접중으로 변경
		 */
		Room room = getRoom(roomId);
		
		// 현재 방장아이디와 입력받은 현재방장 아이디 같아야함.
		if(!memberId.equals(room.getManager())) throw new IsNotRoomManagerException(memberId);
				
		room.setNowMeeting(true);
		setRoom(room);
		

		/*
		 * Mysql에 저장하고 ID받아오기
		 */
		MeetingRoom meetingRoom = MeetingRoom.of(room);
		Long roomIdmysql = meetingRepository.save(meetingRoom).getId();
		
		return roomIdmysql;
	}
	
	public void finishMeeting(String memberId, int roomId, Long meetingId) {
		/*
		 * redis
		 */
		// redis에 저장된 방 정보 가져온다.
		Room room = getRoom(roomId);
		
		// 현재 방장아이디와 입력받은 현재방장 아이디 같아야함.
		if(!memberId.equals(room.getManager())) throw new IsNotRoomManagerException(memberId);
				
		room.setNowMeeting(false);
		setRoom(room);
		
		/*
		 * mysql
		 */
		MeetingRoom meetingRoom = meetingRepository.findById(meetingId).get();
		
		// 현재 시간 (종료시간)
		Long endTime = System.currentTimeMillis();
        
        // 시작시간 가져오기
        Long startTime = meetingRoom.getStartTime();
        
        // 면접에 걸린 시간 계산에서 저장
        Long takenTime = endTime - startTime;
        		
		meetingRoom.setTakenTime(takenTime);
		
		meetingRepository.save(meetingRoom);
	}


}
