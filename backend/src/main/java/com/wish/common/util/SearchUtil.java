package com.wish.common.util;

import java.util.ArrayList;
import java.util.List;

import com.wish.api.dto.WaitingRoom;
import com.wish.api.dto.response.WaitingroomSearchRes;

public class SearchUtil {
	
	public static List<WaitingroomSearchRes> search(List<WaitingRoom> list, String keyword){
		List<WaitingroomSearchRes> res = new ArrayList<WaitingroomSearchRes>();
		
		// map 순회하면서 조건에 맞는 방을 res에 추가해서 반환하기
		for (WaitingRoom now : list) {
			if(now.getName().contains(keyword)) {
				// WaitingRoom을 WaitingroomSearchRes로 변경
				WaitingroomSearchRes room = WaitingroomSearchRes.of(now);				
				res.add(room);
			}
		}
		
		return res;
	}
	
	// 방 이름으로 검색
	public static List<WaitingroomSearchRes> existByName(List<WaitingRoom> list, String name){
		List<WaitingroomSearchRes> res = new ArrayList<WaitingroomSearchRes>();
		
		// map 순회하면서 조건에 맞는 방을 res에 추가해서 반환하기
		for (WaitingRoom now : list) {
			if(name.equals(now.getName())) {
				// WaitingRoom을 WaitingroomSearchRes로 변경
				WaitingroomSearchRes room = WaitingroomSearchRes.of(now);				
				res.add(room);
			}
		}
		
		return res;
	}
	
	// 방id로 정확히 그 방을 검색
	public static WaitingRoom searchById(List<WaitingRoom> list, int roomId){
		List<WaitingroomSearchRes> res = new ArrayList<WaitingroomSearchRes>();
		
		// map 순회하면서 조건에 맞는 방을 res에 추가해서 반환하기
		for (WaitingRoom now : list) {
			if(now.getRoomId() == roomId) {
				return now;
			}
		}
		
		return null;
	}
}
