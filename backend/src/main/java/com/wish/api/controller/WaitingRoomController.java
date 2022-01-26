package com.wish.api.controller;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wish.api.dto.WaitingRoom;
import com.wish.api.dto.request.WaitingroomCreateReq;
import com.wish.api.dto.request.WaitingroomManagerReq;
import com.wish.api.dto.request.WaitingroomModifyReq;
import com.wish.api.dto.response.BaseRes;
import com.wish.api.dto.response.WaitingroomAddressRes;
import com.wish.api.dto.response.WaitingroomListRes;
import com.wish.api.dto.response.WaitingroomSearchRes;
import com.wish.common.util.SearchUtil;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/*
 * OpenVidu의 방 목록을 관리해주는 기능 위주.
 * DB에 접근은 면접방 종료시에만 일어난다.
 * 
 */

@Api(value = "면접/대기방 관련 API", tags = {"Room"})
@RestController
@RequestMapping("/room/waiting")
public class WaitingRoomController {
	// Openvidu 관련 객체 생성
	
	// 방 목록을 관리할 list
	private List<WaitingRoom> roomList = new LinkedList<WaitingRoom>();
	
	// 방 id로 사용할 변수
	private static int autoIncreament = 0;
	
	// 응답 메세지
	private static final String success = "Success";
	private static final String fail = "fail";
	
	@GetMapping
	@ApiOperation(value = "대기방 검색", notes = "<strong>검색 키워드</strong>를 입력하여 방 목록을 반환한다") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "생성 실패"),
        @ApiResponse(code = 404, message = "???"),
        @ApiResponse(code = 500, message = "서버 에러")
    })
	public ResponseEntity<WaitingroomListRes> searchWaitingRoom(
			@RequestParam @ApiParam(value="방 검색 키워드", required = true) String keyword ) {
	
		// OpenVidu롤 방 생성
		// ?? util 객체 이렇게 할건지, 싱글톤으로할건지
		// search는 아직 구현되지 않음.
		SearchUtil searchUtil = new SearchUtil();
		List<WaitingroomSearchRes> res = new ArrayList<WaitingroomSearchRes>();
		if(keyword == null) {
//			res = roomList;
		}else {
//			res = searchUtil.search(roomList, keyword);
		}
		
		
		return ResponseEntity.status(200).body(WaitingroomListRes.of(res));
	}
	
	
	@PostMapping
	@ApiOperation(value = "대기방 생성", notes = "<strong>방이름, 종류, 방장, 최대인원, 비밀번호</strong>를 입력하여 방을 생성 한다.") 
    @ApiResponses({
        @ApiResponse(code = 201, message = "성공"),
        @ApiResponse(code = 401, message = "생성 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 에러")
    })
	public ResponseEntity<WaitingroomAddressRes> createWaitingRoom(
			@RequestBody @ApiParam(value="방 생성 정보", required = true) WaitingroomCreateReq createInfo) {
	
		//OpenVidu롤 방 생성
		String address = "";
		
		return ResponseEntity.status(201).body(WaitingroomAddressRes.of(address));
	}
	
	
	@PutMapping
	@ApiOperation(value = "대기방 설정 수정", notes = "<strong>방이름, 종류, 방장, 최대인원, 비밀번호 등</strong>를 입력하여 방 설정을 수정한다.") 
    @ApiResponses({
        @ApiResponse(code = 201, message = "수정 성공"),
        @ApiResponse(code = 401, message = "수정 실패"),
        @ApiResponse(code = 404, message = "해당 방 없음"),
        @ApiResponse(code = 500, message = "서버 에러")
    })
	public ResponseEntity<BaseRes> modifyWaitingRoom(
			@RequestBody @ApiParam(value="방 설정 정보", required = true) WaitingroomModifyReq modifyInfo) {
	
		// 현재 참여자가 6인데 최대 참여인원을 5로 바꾸면 에러
		// 현재 면접관최대인원인 2인데 면접관 최대를 1로 바꾸려면 에러
		
		
		
		return ResponseEntity.status(201).body(BaseRes.of(201, success));
	}
	
	
	@DeleteMapping
	@ApiOperation(value = "대기방 삭제", notes = "<strong>방 id</strong>를 입력하여 방을 삭제한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "삭제 성공"),
        @ApiResponse(code = 403, message = "현재 방장이 아니라 삭제 불가"),
        @ApiResponse(code = 404, message = "해당 방 없음"),
        @ApiResponse(code = 500, message = "서버 에러")
    })
	public ResponseEntity<BaseRes> deleteWaitingRoom(
			@RequestParam @ApiParam(value="방 id", required = true) int roomId) {
	
		// OpenVidu에서 방 삭제 -> 이건 프론트에서 하는건가??
		// 클라이언트끼리 웹소켓으로 정하고 서버에 보고할 뿐이라 검증할 필요 없음
		int n = roomList.size();
		for (int i = 0; i < n; i++) {
			if(roomList.get(i).getRoomId() == roomId) roomList.remove(i);
		}
		
		return ResponseEntity.status(200).body(BaseRes.of(200, success));
	}
	
	@GetMapping("/enter")
	@ApiOperation(value = "대기방 참여", notes = "<strong>방Id, 비밀번호</strong>를 입력하여 대기방 주소를 받아간다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "비밀번호가 틀렸습니다."),
        @ApiResponse(code = 404, message = "존재하지 않는 방 id입니다."),
        @ApiResponse(code = 500, message = "서버 에러")
    })
	public ResponseEntity<WaitingroomAddressRes> enterWaitingRoom(
			@RequestParam @ApiParam(value="방id", required = true) int roomId,
			@RequestParam @ApiParam(value="방 비밀번호", required = true) String password) {
	
		// 방장 이름으로 방 찾기
		// 비밀번호 일치여부 확인
		// 최대인원 확인
		// 주소 리턴
		String address = "";
		
		return ResponseEntity.status(200).body(WaitingroomAddressRes.of(address));
	}
	

	@GetMapping("/exit")
	@ApiOperation(value = "대기방 나가기", notes = "<strong>방Id, 사용자 id</strong>") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "생성 실패"),
        @ApiResponse(code = 404, message = "???"),
        @ApiResponse(code = 500, message = "서버 에러")
    })
	public ResponseEntity<BaseRes> exitWaitingRoom(
			@RequestParam @ApiParam(value="나가려는 방 id", required = true) String roomId,
			@RequestParam @ApiParam(value="나가려는 멤버", required = true) String memberId) {
	
		// 방장 이름으로 방 찾기
		// 방장이 나간다면 임의로 방장 넣어준다.
		// 현재인원-1 -> 현재 인원 0이면 방을 자동 제거
		int res = 0;
		
		return ResponseEntity.status(200).body(BaseRes.of(200, success));
	}
	
	
	@PutMapping("/manager")
	@ApiOperation(value = "방장 변경", notes = "<strong>방id, 본인id(현재방장), 바꿀 방장id</strong>를 입력하여 방장을 변경한다.") 
    @ApiResponses({
        @ApiResponse(code = 201, message = "변경 성공"),
        @ApiResponse(code = 401, message = "변경 실패"),
        @ApiResponse(code = 403, message = "현재 방장이 아니라 권한 위임 불가"),
        @ApiResponse(code = 404, message = "지정한 새 방장이 방에 존재하지 않음"),
        @ApiResponse(code = 500, message = "서버 에러")
    })
	public ResponseEntity<BaseRes> changeManager(
			@RequestBody @ApiParam(value="방id, 본인id(현재방장), 바꿀 방장id", required = true) WaitingroomManagerReq managerChangeInfo ) {
	
		// 현재 방장아이디와 입력받은 현재방장 아이디가 다르면 거부
		// nextManager가 방에 없으면 거부
		
		return ResponseEntity.status(201).body(BaseRes.of(201, success));
	}	

}
