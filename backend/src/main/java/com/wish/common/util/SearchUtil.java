package com.wish.common.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.wish.api.dto.Room;
import com.wish.api.dto.response.RoomSearchRes;

public class SearchUtil {
	
	// 방 이름으로 검색. 문자열이 포함만 되도 검색함.
	public static List<RoomSearchRes> searchByRoomName(List<Room> list, String name){
		
		
		List<RoomSearchRes> res = new ArrayList<RoomSearchRes>();
		
		// map 순회하면서 조건에 맞는 방을 res에 추가해서 반환하기
		for (Room now : list) {
			if(now.getName().contains(name)) {
				// WaitingRoom을 WaitingroomSearchRes로 변경
				RoomSearchRes room = RoomSearchRes.of(now);				
				res.add(room);
			}
		}
		
		return res;
	}
	
	// 방id로 정확히 그 방을 검색
	public static List<RoomSearchRes> searchById(List<Room> list, String roomId){
		List<RoomSearchRes> res = new ArrayList<RoomSearchRes>();
		
		try {
			int roomId2 = Integer.parseInt(roomId);
			// map 순회하면서 조건에 맞는 방을 res에 추가해서 반환하기
			for (Room now : list) {
				if(now.getRoomId() == roomId2) {
					RoomSearchRes room = RoomSearchRes.of(now);				
					res.add(room);
					break;
				}
			}
			
			return res;
		} catch (NumberFormatException e) {
			// TODO: handle exception
			System.err.println("숫자가 아니네.");
		}
		
		return null;
	}
	

	public static List<RoomSearchRes> searchByChosung(List<Room> list, String name){
		
		Map<Character, Integer> map1 = new HashMap<Character, Integer>();
		Character[] chosung = {'ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'};
		for(int a=0; a<chosung.length; a++) {
			map1.put(chosung[a], a);
		}
		
		List<RoomSearchRes> res = new ArrayList<RoomSearchRes>();
		
		System.out.println();
		List<Integer> list1 = new ArrayList<Integer>();
		for(int a=0; a<name.length(); a++){
			list1.add(map1.get(name.charAt(a)));
			System.out.print(map1.get(name.charAt(a)) + " ");
		}
		System.out.println("---가 검색 키워드");
		
			
		//LG 가가가
		
		// map 순회하면서 조건에 맞는 방을 res에 추가해서 반환하기
		for (Room now : list) {
			
			//초성만 뽑은거
			List<Integer> tempList1 = new ArrayList<Integer>();
			
			//x x 12593 12593 12593
			
			//ㅅㅅ ㅁㅈㅂ
			//삼성 면접방
			String roomName = now.getName();
			System.out.println(roomName);
			for(int a=0; a<roomName.length(); a++){
				int tempInt = (int)roomName.charAt(a);
				if(tempInt>=44032 && tempInt<55204) {
					tempInt-=44032;
					tempInt /=(588);
				}
				tempList1.add(tempInt);
				System.out.print(tempList1.get(a) + " ");
			}
			System.out.println("---");
			
			
			//TODO
			//kmp 알고리즘 사용해야하는 부분
			int len = tempList1.size()-list1.size();
			if(len<0) continue;
				
			for(int a=0; a<=tempList1.size()-list1.size(); a++) {
				for(int b=0; b<list1.size(); b++) {
					if(tempList1.get(a+b) == list1.get(b)) {
						if(b== list1.size()-1) {
							RoomSearchRes room = RoomSearchRes.of(now);				
							res.add(room);
						}
					}
					else {
						break;
					}
				}
			}
		}
		
		return res;
	}
	
	
	//keyword가 초성인지 체크하는 함수.
	//초성이라면 true 리턴
	public static boolean checkChoSung(String keyword) {
		
		if(keyword.charAt(0) >='ㄱ' && keyword.charAt(0) <='ㅎ') return true;

		return false;
	}
	
	//어떤 검색함수를 사용할지 결정하는 함수.
	public List<RoomSearchRes> searchFunc(List<Room> roomList, String keyword, int searchType){
		List<RoomSearchRes> res = new ArrayList<RoomSearchRes>();
		
		//default
		if(searchType==-1) {
			for(int a=0; a<roomList.size(); a++) {
				res.add(new RoomSearchRes().of(roomList.get(a)));
			}	
		}
		//id로 검색
		else if(searchType == 0) {
			res = searchById(roomList, keyword);
		}
		//방이름으로 검색
		else if(searchType == 1) {
			
			//초성으로 검색
			if(checkChoSung(keyword)) res = searchByChosung(roomList, keyword);
			//방이름 전체로 검색
			else res = searchByRoomName(roomList, keyword);
		}
		
		return res;
	}


	
}
