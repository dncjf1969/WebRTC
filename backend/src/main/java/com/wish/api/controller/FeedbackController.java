package com.wish.api.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wish.api.dto.request.FeedbackCreateReq;
import com.wish.api.dto.response.BaseRes;
import com.wish.api.dto.response.FeedbackByRoomRes;
import com.wish.api.dto.response.FeedbackRes;
import com.wish.api.dto.response.MeetingCountRes;
import com.wish.api.service.FeedbackService;
import com.wish.common.auth.WishUserDetails;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "피드백 관련 API", tags = {"Feedback"})
@RestController
@RequestMapping("/feedback")
@CrossOrigin
public class FeedbackController {

	@Autowired
	FeedbackService feedbackService;
	
	// 응답 메세지
	private static final String success = "Success";
	private static final String fail = "fail";
	
	
	@GetMapping
	@ApiOperation(value = "본인이 받은 전체 피드백 조회") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
//	@PreAuthorize("hasAnyRole('USER')")
	public ResponseEntity<List<FeedbackByRoomRes>> getMyFeedback(
//			@ApiIgnore Authentication authentication,
			@ApiParam(value="마이페이지를 볼 회원 id", required = true)String memberId) {
		
		// 1. memberId -> List<참여했던 방 ID>
		List<Long> roomIdList = feedbackService.getMeetingIdList(memberId);
		// 2. 응답용 객체 생성
		List<FeedbackByRoomRes> res = new ArrayList<FeedbackByRoomRes>();
		List<FeedbackRes> feedbackList;
		for (Long roomId : roomIdList) {
			// 3. 방Id -> List<피드백>
			feedbackList = feedbackService.getMyFeedbackByRoom(roomId, memberId);
			// 4. 응답 객체에 이 리스트들을 추가함
			res.add(new FeedbackByRoomRes().of(feedbackList));
		}
		
		// List<FeedbackByRoomRes = List<FeedbackRes>>
		// 리스트<리스트<피드백>>
		return ResponseEntity.status(200).body(res);
	}
	
	@GetMapping("/count")
	@ApiOperation(value = "본인의 면접 종류별 횟수 얻기") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
//	@PreAuthorize("hasAnyRole('USER')")
	public ResponseEntity<List<MeetingCountRes>> getMeetingCount(
//			@ApiIgnore Authentication authentication,
			@ApiParam(value="마이페이지를 볼 회원 id", required = true)String memberId) {
		
//		String memberId = authentication.getName();
				
//		List<FeedbackRes> res = feedbackService.getMyFeedback(authentication.getName());
		List<MeetingCountRes> res = feedbackService.getMyMeetingCounts(memberId);

		return ResponseEntity.status(200).body(res);
	}
	
	@PostMapping
	@ApiOperation(value = "피드백 추가") 
    @ApiResponses({
        @ApiResponse(code = 201, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
//	@PreAuthorize("hasAnyRole('USER')")
	public ResponseEntity<BaseRes> createFeedback(
			@ApiIgnore Authentication authentication,
			@RequestBody @ApiParam(value="피드백 정보")FeedbackCreateReq info) {
		
		feedbackService.createFeedback(info);
		
		return ResponseEntity.status(201).body(BaseRes.of(201, success));
		
	}
	
	@DeleteMapping
	@ApiOperation(value = "피드백 삭제") 
    @ApiResponses({
        @ApiResponse(code = 201, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	@PreAuthorize("hasAnyRole('USER')")
	public ResponseEntity<BaseRes> deleteFeedback(
			@ApiIgnore Authentication authentication,
			@RequestParam @ApiParam(value="피드백 Id")Long feedbackId) {
		
		//ToDO
		//유저 디테일이 안 생긴다면 수행 불가.로 해야함.
		
		feedbackService.deleteFeedback(feedbackId);

		return ResponseEntity.status(201).body(BaseRes.of(201, success));
	}
	
	@GetMapping("/meeting")
	@ApiOperation(value = "이번 면접에서 본인이 받은 피드백 조회") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
//	@PreAuthorize("hasAnyRole('USER')")
	public ResponseEntity<List<FeedbackRes>> getMeetingroomFeedback(
//			@ApiIgnore Authentication authentication,
			@ApiParam(value="회원 id", required = true)String memberId,
			@ApiParam(value="면접방 id", required = true)Long roomId) {
		
		List<FeedbackRes> res = feedbackService.getMyFeedbackByRoom(roomId, memberId);
			
		return ResponseEntity.status(200).body(res);
	}
}
