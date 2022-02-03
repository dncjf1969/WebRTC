package com.wish.api.controller;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.wish.api.dto.WaitingRoom;
import com.wish.api.dto.request.WaitingroomCreateReq;
import com.wish.api.dto.request.WaitingroomManagerReq;
import com.wish.api.dto.request.WaitingroomModifyReq;
import com.wish.api.dto.response.BaseRes;
import com.wish.api.dto.response.WaitingroomListRes;
import com.wish.api.dto.response.WaitingroomSearchRes;
import com.wish.api.dto.response.WaitingroomTokenRes;
import com.wish.common.util.JwtTokenUtil;
import com.wish.common.util.SearchUtil;

import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.OpenViduRole;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.ConnectionType;
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
@RequestMapping("/room")
public class WaitingRoomController {
	
	// 방 목록을 관리할 list
	private List<WaitingRoom> roomList = new LinkedList<WaitingRoom>();
	
	// 방 id로 사용할 변수
	private static int autoIncreament = 0;
	
	// 응답 메세지
	private static final String success = "Success";
	private static final String fail = "fail";
	

	// Openvidu 관련 객체 생성
	private OpenVidu openVidu;
	
	// OpenVidu서버 주소
	private String OPENVIDU_URL;
	// OpenVidu와 공유하는 SECRET
	private String SECRET;

	private SearchUtil searchUtil = new SearchUtil();
	
	public WaitingRoomController(@Value("${openvidu.secret}") String secret, @Value("${openvidu.url}") String openviduUrl) {
		this.SECRET = secret;
		this.OPENVIDU_URL = openviduUrl;
		this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
	}
	
	@GetMapping("/waiting")
	@ApiOperation(value = "대기방 검색", notes = "<strong>검색 키워드</strong>를 입력하여 방 목록을 반환한다") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "생성 실패"),
        @ApiResponse(code = 404, message = "???"),
        @ApiResponse(code = 500, message = "서버 에러")
    })
	public ResponseEntity<WaitingroomListRes> searchWaitingRoom(
			@RequestParam @ApiParam(value="방 검색 키워드", allowEmptyValue=true) String keyword ) {
	
		List<WaitingroomSearchRes> res = new LinkedList<WaitingroomSearchRes>();
		
		// keyword가 비어있으면 전체 리스트를 반환한다.
		if(keyword == null) {
			for (WaitingRoom now : roomList) {
				WaitingroomSearchRes searchRes = WaitingroomSearchRes.of(now);
				res.add(searchRes);
			}
		}else {
			// 현재는 방 제목 기준으로만 검색됨.
			res = searchUtil.search(roomList, keyword);
		}

		return ResponseEntity.status(200).body(WaitingroomListRes.of(res));
	}
	
	
	@PostMapping("/waiting")
	@ApiOperation(value = "대기방 생성", notes = "<strong>방이름, 종류, 방장, 최대인원, 비밀번호</strong>를 입력하여 방을 생성 한다.") 
    @ApiResponses({
        @ApiResponse(code = 201, message = "성공"),
        @ApiResponse(code = 401, message = "동일한 이름의 방 존재"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 에러")
    })
	public ResponseEntity<WaitingroomTokenRes> createWaitingRoom(
			@RequestBody @ApiParam(value="방 생성 정보", required = true) WaitingroomCreateReq createInfo) throws OpenViduJavaClientException, OpenViduHttpException {
	
		// 로그인 검사
		try {
//			checkUserLogged(httpSession);
		} catch (Exception e) {
//			return "index";
		}
		
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
		Session session = this.openVidu.createSession();
		String token = session.createConnection(connectionProperties).getToken();	// 주소가 들어간다 wss://192.~
		
		// 방목록에 새로 만든 방 추가
		WaitingRoom room = WaitingRoom.of(session, token, autoIncreament++, createInfo);
		roomList.add(room);
		
		// 클라이언트에 토큰(주소) 전달
		return ResponseEntity.status(201).body(WaitingroomTokenRes.of(token,room.getRoomId()));
	}
	
	
	@PutMapping("/waiting")
	@ApiOperation(value = "대기방 설정 수정", notes = "<strong>방이름, 종류, 방장, 최대인원, 비밀번호 등</strong>를 입력하여 방 설정을 수정한다.") 
    @ApiResponses({
        @ApiResponse(code = 201, message = "수정 성공"),
        @ApiResponse(code = 400, message = "현재 인원이 수정하려는 최대인원 수 보다 많음"),
        @ApiResponse(code = 401, message = "수정 실패"),
        @ApiResponse(code = 404, message = "해당 방 없음"),
        @ApiResponse(code = 500, message = "서버 에러")
    })
	public ResponseEntity<BaseRes> modifyWaitingRoom(
			@RequestBody @ApiParam(value="방 설정 정보", required = true) WaitingroomModifyReq modifyInfo) {
		
		int roomId = modifyInfo.getRoomId();		
		
		WaitingRoom room;
		for (int i = 0, n = roomList.size(); i<n; i++) {
			System.out.println("n : "+n);
			System.out.println("i : "+i);
			room = roomList.get(i);
			if(room.getRoomId() == roomId) {
				System.out.println("==========");
				// 현재 참여자가 6인데 최대 참여인원을 5로 바꾸면 에러
				if(room.getMemberCount() > modifyInfo.getMemberMax()) {
					System.out.println(room.getMemberCount()+" / "+ modifyInfo.getMemberMax());
					return ResponseEntity.status(400).body(BaseRes.of(400, fail));
				}
				
				// 방장이 아닌 사람이 시도하면 에러
				// spring security 문제인듯. 우선 구현 안함
				
				// 정보 수정
				room.setName(modifyInfo.getName());
				room.setType(modifyInfo.getType());
				room.setJob(modifyInfo.getJob());
				room.setMemberMax(modifyInfo.getMemberMax());
				room.setPassword(modifyInfo.getPassword());
				return ResponseEntity.status(201).body(BaseRes.of(201, success));
			}
		}

		return ResponseEntity.status(404).body(BaseRes.of(404, fail));
	}
	
	
	@DeleteMapping("/waiting")
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
			if(roomList.get(i).getRoomId() == roomId) {
				roomList.remove(i);
				return ResponseEntity.status(200).body(BaseRes.of(200, success));
			}
		}
		
		return ResponseEntity.status(404).body(BaseRes.of(404, fail));
	}
	
	@GetMapping("/waiting/enter")
	@ApiOperation(value = "대기방 참여", notes = "<strong>방Id, 비밀번호</strong>를 입력하여 대기방 주소를 받아간다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 400, message = "가득찬 방입니다."),
        @ApiResponse(code = 401, message = "비밀번호가 틀렸습니다."),
        @ApiResponse(code = 404, message = "존재하지 않는 방 id입니다."),
        @ApiResponse(code = 500, message = "서버 에러")
    })
	public ResponseEntity<BaseRes> enterWaitingRoom(
			@RequestParam @ApiParam(value="방id", required = true) int roomId,
			@RequestParam @ApiParam(value="방 비밀번호", allowEmptyValue=true) String password) {

		String token = "";
		
		// 방장 이름으로 방 찾기
		WaitingRoom room = SearchUtil.searchById(roomList, roomId);
		
		if(room != null) {
			// 최대인원 확인
			if(room.getMemberCount() < room.getMemberMax()) {
				// 비밀번호 일치여부 확인
				if(password.equals(room.getPassword())) {
					token = room.getToken();
					room.setMemberCount(room.getMemberCount()+1);	// 현재인원+1
				}else {
					// 비밀번호 틀림
					return ResponseEntity.status(401).body(BaseRes.of(401, fail));
				}
			}else {
				// 이미 최대인원만큼 참가함
				return ResponseEntity.status(400).body(BaseRes.of(400, fail));
			}
		}else {	
			// roomId가 일치하는 방 없음
			return ResponseEntity.status(404).body(BaseRes.of(404, fail));
		}		

		// 주소 리턴
		return ResponseEntity.status(200).body(WaitingroomTokenRes.of(token,roomId));
	}
	

	@GetMapping("/waiting/exit")
	@ApiOperation(value = "대기방 나가기", notes = "<strong>방Id, 사용자 id</strong>") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "생성 실패"),
        @ApiResponse(code = 404, message = "???"),
        @ApiResponse(code = 500, message = "서버 에러")
    })
	public ResponseEntity<BaseRes> exitWaitingRoom(
			@RequestParam @ApiParam(value="나가려는 방 id", required = true) int roomId,
			@RequestParam @ApiParam(value="나가려는 멤버", required = true) String memberId,
			@RequestParam @ApiParam(value="다음 방장", allowEmptyValue=true) String nextManager) {
	
		// 방장 이름으로 방 찾기
		// 방장이 나간다면..?
		// 현재인원-1 -> 현재 인원 0이면 방을 자동 제거
		WaitingRoom room;
		for (int i = 0, n = roomList.size(); i<n; i++) {
			room = roomList.get(i);
			if(room.getRoomId() == roomId) {
				// 나가려는게 방장이면 클라이언트에서 지정된 다음 방장으로 변경
				if(memberId.equals(room.getManager())) {
					room.setManager(nextManager);
				}
				
				// 인원수 -1
				room.setMemberCount(room.getMemberCount()-1);
				// 인원수 0이면 목록에서 방 제거
				if(room.getMemberCount() == 0) this.deleteWaitingRoom(roomId);
				
			}
		}
		
		return ResponseEntity.status(200).body(BaseRes.of(200, success));
	}
	
	
	@PutMapping("/waiting/manager")
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
	
		
		int roomId = managerChangeInfo.getRoomId();

		WaitingRoom room;
		for (int i = 0, n = roomList.size(); i<n; i++) {
			room = roomList.get(i);
			if(room.getRoomId() == roomId) {
				// 현재 방장아이디와 입력받은 현재방장 아이디 같아야함.
				// manager토큰에서 아이디 꺼내긱
//				String payload= JwtTokenUtil.createDecodedJWT(managerChangeInfo.getManagerToken()).getPayload();
//				String managerId = payload에서 파싱
				if(true) {
					room.setManager(managerChangeInfo.getNextManagerId());
					return ResponseEntity.status(201).body(BaseRes.of(201, success));
				}
			}
		}
		
		return ResponseEntity.status(401).body(BaseRes.of(401, fail));
	}	
	
	
	
	@GetMapping("/meeting/start")
	@ApiOperation(value = "미팅 시작", notes = "방장이 시작시 알림") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "JWT 유효성 검사 실패"),
        @ApiResponse(code = 403, message = "현재 방장이 아니라 권한 위임 불가"),
        @ApiResponse(code = 404, message = "지정한 새 방장이 방에 존재하지 않음"),
        @ApiResponse(code = 500, message = "서버 에러")
    })
	public ResponseEntity<BaseRes> startMeeting(
			@RequestParam @ApiParam(value="대기방 id", required = true) int roomId) {
	
		for (int i = 0, size = roomList.size(); i < size; i++) {
			if(roomList.get(i).getRoomId()==roomId) {
				roomList.get(i).setNowMeeting(true);
				return ResponseEntity.status(200).body(BaseRes.of(200, success));
			}
		}
		
		// DB에 넣어서 db에서 사용하는 id를 프론트로 반환
		
		return ResponseEntity.status(401).body(BaseRes.of(401, fail));
	}
	
	@GetMapping("/meeting/finish")
	@ApiOperation(value = "미팅 종료", notes = "방장이 종료시 알림") 
    @ApiResponses({
        @ApiResponse(code = 201, message = "성공"),
        @ApiResponse(code = 401, message = "JWT 유효성 검사 실패"),
        @ApiResponse(code = 403, message = "현재 방장이 아니라 종료 알림 불가"),
        @ApiResponse(code = 404, message = "지정한 새 방장이 방에 존재하지 않음"),
        @ApiResponse(code = 500, message = "서버 에러")
    })
	public ResponseEntity<BaseRes> finishMeeting(
			@RequestParam @ApiParam(value="대기방 id", required = true) int roomId) {
	
		for (int i = 0, size = roomList.size(); i < size; i++) {
			if(roomList.get(i).getRoomId()==roomId) {
				roomList.get(i).setNowMeeting(false);
				return ResponseEntity.status(200).body(BaseRes.of(201, success));
			}
		}
		
		return ResponseEntity.status(401).body(BaseRes.of(401, fail));
	}
	

}
