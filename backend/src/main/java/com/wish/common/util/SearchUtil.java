package com.wish.common.util;

import java.util.ArrayList;
import java.util.List;

import com.wish.api.dto.Room;
import com.wish.api.dto.response.RoomSearchRes;

public class SearchUtil {
	
	public static List<RoomSearchRes> search(List<Room> list, String keyword){
		List<RoomSearchRes> res = new ArrayList<RoomSearchRes>();
		
		// map 순회하면서 조건에 맞는 방을 res에 추가해서 반환하기
		for (Room now : list) {
			if(now.getName().contains(keyword)) {
				// WaitingRoom을 WaitingroomSearchRes로 변경
				RoomSearchRes room = RoomSearchRes.of(now);				
				res.add(room);
			}
		}
		
		return res;
	}
	
	// 방 이름으로 검색
	public static List<RoomSearchRes> existByName(List<Room> list, String name){
		List<RoomSearchRes> res = new ArrayList<RoomSearchRes>();
		
		// map 순회하면서 조건에 맞는 방을 res에 추가해서 반환하기
		for (Room now : list) {
			if(name.equals(now.getName())) {
				// WaitingRoom을 WaitingroomSearchRes로 변경
				RoomSearchRes room = RoomSearchRes.of(now);				
				res.add(room);
			}
		}
		
		return res;
	}
	
	// 방id로 정확히 그 방을 검색
	public static Room searchById(List<Room> list, int roomId){
		List<RoomSearchRes> res = new ArrayList<RoomSearchRes>();
		
		// map 순회하면서 조건에 맞는 방을 res에 추가해서 반환하기
		for (Room now : list) {
			if(now.getRoomId() == roomId) {
				return now;
			}
		}
		
		return null;
	}
}
