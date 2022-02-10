package com.wish.api.controller;

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
import com.wish.api.dto.response.FeedbackRes;
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
	@ApiOperation(value = "본인 피드백 조회") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
//	@PreAuthorize("hasAnyRole('USER')")
	public ResponseEntity<List<FeedbackRes>> getMyFeedback(
//			@ApiIgnore Authentication authentication,
			@ApiParam(value="마이페이지를 볼 회원 id", required = true)String memberId) {
		
//		String memberId = authentication.getName();
				
//		List<FeedbackRes> res = feedbackService.getMyFeedback(authentication.getName());
		List<FeedbackRes> res = feedbackService.getMyFeedback(memberId);

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
	@PreAuthorize("hasAnyRole('USER')")
	public ResponseEntity<BaseRes> createFeedback(
			@ApiIgnore Authentication authentication,
			@RequestBody @ApiParam(value="멤버Id")FeedbackCreateReq info) {
		
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
	
}
