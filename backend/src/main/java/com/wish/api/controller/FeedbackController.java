package com.wish.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "피드백 관련 API", tags = {"Feedback"})
@RestController
@RequestMapping("/feedback")
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
	public ResponseEntity<List<FeedbackRes>> getMyFeedback(
			@RequestParam @ApiParam(value="멤버Id")String memberId) {
		
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
	public ResponseEntity<BaseRes> createFeedback(
			@RequestBody @ApiParam(value="멤버Id")FeedbackCreateReq info) {
		
		if(feedbackService.createFeedback(info)) return ResponseEntity.status(200).body(BaseRes.of(201, success));
		return ResponseEntity.status(401).body(BaseRes.of(401, fail));
	}
	
	@DeleteMapping
	@ApiOperation(value = "피드백 삭제") 
    @ApiResponses({
        @ApiResponse(code = 201, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<BaseRes> deleteFeedback(
			@RequestParam @ApiParam(value="멤버Id")Long feedbackId) {
		
		if(feedbackService.deleteFeedback(feedbackId)) return ResponseEntity.status(200).body(BaseRes.of(201, success));
		return ResponseEntity.status(401).body(BaseRes.of(401, fail));
	}
	
}
