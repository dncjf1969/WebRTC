package com.wish.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.wish.api.dto.Room;
import com.wish.api.dto.request.RoomCreateReq;
import com.wish.api.dto.request.RoomManagerReq;
import com.wish.api.dto.request.RoomModifyReq;
import com.wish.api.dto.response.BaseRes;
import com.wish.api.dto.response.RoomListRes;
import com.wish.api.dto.response.RoomSearchRes;
import com.wish.api.dto.response.RoomTokenRes;
import com.wish.api.service.RoomServiceImpl;
import com.wish.common.exception.custom.NotFoundRoomException;
import com.wish.common.exception.custom.RoomException;
import com.wish.common.util.SearchUtil;
import io.openvidu.java.client.*;
import io.swagger.annotations.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/*
 * OpenVidu의 방 목록을 관리해주는 기능 위주.
 * DB에 접근은 면접방 종료시에만 일어난다.
 * 
 */

@Api(value = "면접/대기방 관련 API", tags = {"Room"})
@RestController
@RequestMapping("/room")
@CrossOrigin
public class RoomController {

	@Autowired
	RoomServiceImpl roomService;
	
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

	public RoomController(@Value("${openvidu.secret}") String secret, @Value("${openvidu.url}") String openviduUrl) {
		this.SECRET = secret;
		this.OPENVIDU_URL = openviduUrl;
		this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
	}
	
	@GetMapping("/waiting/{roomType}")
	@ApiOperation(value = "대기방 검색", notes = "<strong>검색 키워드와 검색 방법</strong>를 입력하여 방 목록을 반환한다<br><br>"
			+ "url의 roomType<br>"
			+ "0 : 인성<br>"
			+ "1 : 직무<br>"
			+ "--------<br>"
			+ "검색 방법 searchType<br>"
			+ "-1 : default<br>"
			+ "0 : 방ID로 검색<br>"
			+ "1 : 방이름으로 검색(초성으로도 검색됨.)<br>") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "생성 실패"),
        @ApiResponse(code = 404, message = "???"),
        @ApiResponse(code = 500, message = "서버 에러")
    })
	//@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
	public ResponseEntity<RoomListRes> searchWaitingRoom(
			@ApiIgnore Authentication authentication,
			@PathVariable("roomType") int roomType,
			@RequestParam @ApiParam(value="방 검색 키워드") String keyword,
			@RequestParam @ApiParam(value="검색 방법") int searchType ) {
		
		
		System.out.println("대기방 리스트 검색 ");
		
		List<Room> roomList= roomService.getRoomList(roomType);
	
		List<RoomSearchRes> res = searchUtil.searchFunc(roomList, keyword, searchType);
		

		return ResponseEntity.status(200).body(RoomListRes.of(res));
	}
	
	@GetMapping("/waiting/info")
	@ApiOperation(value = "대기방 정보 보기", notes = "<strong>roomId</strong>를 입력하여 방 정보를 반환한다") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = " 실패"),
        @ApiResponse(code = 404, message = "???"),
        @ApiResponse(code = 500, message = "서버 에러")
    })
	//@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
	public ResponseEntity<?> getWaitingRoomInfo(
			@ApiIgnore Authentication authentication,
			@RequestParam @ApiParam(value="방 번호") Integer roomId ) {
		
		System.out.println("방 정보 보기");
		
		Room room= roomService.getRoom(roomId);
		
		return ResponseEntity.status(405).body(BaseRes.of(405, "에러요"));
	}
	
	
	@PostMapping("/waiting")
	@ApiOperation(value = "대기방 생성", notes = "<strong>방이름, 종류, 방장, 최대인원, 비밀번호</strong>를 입력하여 방을 생성 한다.") 
    @ApiResponses({
        @ApiResponse(code = 201, message = "성공"),
        @ApiResponse(code = 401, message = "동일한 이름의 방 존재"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 에러")
    })
	//@PreAuthorize("hasAnyRole('USER')")
	public ResponseEntity<?> createWaitingRoom(
			@ApiIgnore Authentication authentication,
			@RequestBody @ApiParam(value="방 생성 정보", required = true) RoomCreateReq createInfo) throws OpenViduJavaClientException, OpenViduHttpException {
	
		System.out.println("대기방 생성 ");
		
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
//			WaitingRoom room = WaitingRoom.of(session, token, autoIncreament++, createInfo);
//			roomList.add(room);
		
		Room room = Room.of(token, autoIncreament++, createInfo);
		
		System.out.println(room.toString());
		//redis에 방 정보 추가.
		roomService.setRoom(room);
		
		// 클라이언트에 토큰(주소) 전달
		return ResponseEntity.status(201).body(RoomTokenRes.of(token,room.getRoomId()));
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
	//@PreAuthorize("hasAnyRole('USER')")
	public ResponseEntity<BaseRes> modifyWaitingRoom(
			@ApiIgnore Authentication authentication,
			@RequestBody @ApiParam(value="방 설정 정보", required = true) RoomModifyReq modifyInfo){
		
		System.out.println("대기방 설정 변경");
		
		//authentication에 있는 멤버id로 방장인지 비교
		//String memberId = authentication.getName();
		
		
		int roomId = modifyInfo.getRoomId();		
		
		Room room = roomService.getRoom(roomId);
			
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
			
			System.out.println(room.toString());
			roomService.setRoom(room);
			
		}
		
		return ResponseEntity.status(201).body(BaseRes.of(201, success));

	}
	
	
	@DeleteMapping("/waiting")
	@ApiOperation(value = "대기방 삭제", notes = "<strong>방 id</strong>를 입력하여 방을 삭제한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "삭제 성공"),
        @ApiResponse(code = 403, message = "현재 방장이 아니라 삭제 불가"),
        @ApiResponse(code = 404, message = "해당 방 없음"),
        @ApiResponse(code = 500, message = "서버 에러")
    })
	//@PreAuthorize("hasAnyRole('USER')")
	public ResponseEntity<BaseRes> deleteWaitingRoom(
			@ApiIgnore Authentication authentication,
			@RequestParam @ApiParam(value="방 id", required = true) int roomId) {
	
		
		//authentication에 있는 멤버id로 방장인지 비교
		
		
		//룸 삭제
		roomService.deleteRoom(roomId);
		
		//리스트에서도 지워야하낟.
		
		System.out.println("방 삭제");
		
		return ResponseEntity.status(200).body(BaseRes.of(200, success));
	
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
	//@PreAuthorize("hasAnyRole('USER')")
	public ResponseEntity<BaseRes> enterWaitingRoom(
			@ApiIgnore Authentication authentication,
			@RequestParam @ApiParam(value="방id", required = true) int roomId,
			@RequestParam @ApiParam(value="방 비밀번호", allowEmptyValue=true) String password) throws JsonProcessingException {
		
		//redis에서 방 찾기
		Room room = roomService.getRoom(roomId);
//		
		// 최대인원 확인
		if(room.getMemberCount()< room.getMemberMax()) {
			// 비밀번호 일치여부 확인
			if( room.getPassword().equals(password)) {
				
				int nowMemberCnt = room.getMemberCount();
				room.setMemberCount(nowMemberCnt+1);
				roomService.setRoom(room);

			}else {
				// 비밀번호 틀림
				return ResponseEntity.status(401).body(BaseRes.of(401, fail));
			}
		}else {
			// 이미 최대인원만큼 참가함
			return ResponseEntity.status(400).body(BaseRes.of(400, fail));
		}

		// 주소 리턴
		return ResponseEntity.status(200).body(RoomTokenRes.of(room.getToken(),roomId));
	}
	

	@GetMapping("/waiting/exit")
	@ApiOperation(value = "대기방 나가기", notes = "<strong>방Id, 사용자 id</strong>") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "생성 실패"),
        @ApiResponse(code = 404, message = "???"),
        @ApiResponse(code = 500, message = "서버 에러")
    })
	//@PreAuthorize("hasAnyRole('USER')")
	public ResponseEntity<BaseRes> exitWaitingRoom(
			@ApiIgnore Authentication authentication,
			@RequestParam @ApiParam(value="나가려는 방 id", required = true) int roomId,
			@RequestParam @ApiParam(value="나가려는 멤버", required = true) String memberId,
			@RequestParam @ApiParam(value="다음 방장", allowEmptyValue=true) String nextManager) {
	
		
		// 방장 이름으로 방 찾기
		// 방장이 나간다면..?
		// 현재인원-1 -> 현재 인원 0이면 방을 자동 제거
		
		//redis에서 방 찾기
		Room room = roomService.getRoom(roomId);
		if(room.getRoomId() == roomId) {
			// 나가려는게 방장이면 클라이언트에서 지정된 다음 방장으로 변경
			if(memberId.equals(room.getManager())) {
				room.setManager(nextManager);
			}
				
			// 인원수 -1
			room.setMemberCount(room.getMemberCount()-1);
			
			roomService.setRoom(room);
			
			// 인원수 0이면 목록에서 방 제거
			if(room.getMemberCount() == 0) 
			{
				this.deleteWaitingRoom(authentication, roomId);
				roomService.deleteRoom(roomId);
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
	//@PreAuthorize("hasAnyRole('USER')")
	public ResponseEntity<BaseRes> changeManager(
			@ApiIgnore Authentication authentication,
			@RequestBody @ApiParam(value="방id, 본인id(현재방장), 바꿀 방장id", required = true) RoomManagerReq managerChangeInfo ) {
	
		
		//authentication에 있는 멤버id로 방장인지 비교
		
		int roomId = managerChangeInfo.getRoomId();

		Room room = roomService.getRoom(roomId);
		if(room.getRoomId() == roomId) {
			// 현재 방장아이디와 입력받은 현재방장 아이디 같아야함.
			// manager토큰에서 아이디 꺼내긱
//				String payload= JwtTokenUtil.createDecodedJWT(managerChangeInfo.getManagerToken()).getPayload();
//				String managerId = payload에서 파싱
			if(true) {
				room.setManager(managerChangeInfo.getNextManagerId());
				
				roomService.setRoom(room);
				
				return ResponseEntity.status(201).body(BaseRes.of(201, success));
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
	//@PreAuthorize("hasAnyRole('USER')")
	public ResponseEntity<BaseRes> startMeeting(
			@ApiIgnore Authentication authentication,
			@RequestParam @ApiParam(value="대기방 id", required = true) int roomId) {
	
		
		//authentication에 있는 멤버id로 방장인지 비교
		
		Room room = roomService.getRoom(roomId);
		room.setNowMeeting(true);
		roomService.setRoom(room);
		
		return ResponseEntity.status(200).body(BaseRes.of(200, success));
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
	//@PreAuthorize("hasAnyRole('USER')")
	public ResponseEntity<BaseRes> finishMeeting(
			@ApiIgnore Authentication authentication,
			@RequestParam @ApiParam(value="대기방 id", required = true) int roomId) {
	
		Room room = roomService.getRoom(roomId);
		room.setNowMeeting(false);
		roomService.setRoom(room);
		
		return ResponseEntity.status(200).body(BaseRes.of(200, success));
	}
	

}

