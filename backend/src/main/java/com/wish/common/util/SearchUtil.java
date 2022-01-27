package com.wish.common.util;

import java.util.ArrayList;
import java.util.List;

import com.wish.api.dto.WaitingRoom;
import com.wish.api.dto.response.WaitingroomSearchRes;

public class SearchUtil {
	
	public List<WaitingroomSearchRes> search(List<WaitingRoom> list, String keyword){
		List<WaitingroomSearchRes> res = new ArrayList<WaitingroomSearchRes>();
		
		// map 순회하면서 조건에 맞는 방을 res에 추가해서 반환하기
		
		return res;
	}
	
	// 방 이름으로 검색
	public List<WaitingroomSearchRes> existByName(List<WaitingRoom> list, String name){
		List<WaitingroomSearchRes> res = new ArrayList<WaitingroomSearchRes>();
		
		// map 순회하면서 조건에 맞는 방을 res에 추가해서 반환하기
		for (WaitingRoom now : list) {
			if(name.equals(now.getName())) {
				WaitingroomSearchRes room = new WaitingroomSearchRes();
				room.setRoomId(now.getRoomId());
				room.setName(now.getName());
				room.setManager(now.getManager());
				room.setType(now.getType());
				room.setJob(now.getJob());
				room.setMemberMax(now.getMemberMax());
				room.setMemberCount(now.getMemberCount());
				
				res.add(room);
			}
		}
		
		return res;
	}
}
