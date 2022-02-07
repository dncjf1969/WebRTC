package com.wish.api.controller;

import com.wish.api.dto.request.*;
import com.wish.api.dto.response.BaseRes;
import com.wish.api.dto.response.QuestionListRes;
import com.wish.api.service.CustomQuestionService;
import com.wish.api.service.QuestionService;
import com.wish.api.service.RelationQuestionService;
import com.wish.db.entity.CustomQuestion;
import com.wish.db.entity.Question;
import io.swagger.annotations.*;
import springfox.documentation.annotations.ApiIgnore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Api(value = "질문 관련 API", tags = {"Question"})
@RestController
@RequestMapping("/question")
public class QuestionController {
	
	@Autowired
	QuestionService questionService;

	@Autowired
	CustomQuestionService customQuestionService;

	@Autowired
	RelationQuestionService relationQuestionService;

	@GetMapping
	@ApiOperation(value = "질문 조회", notes = "waitingroomid에서 질문 가져오기.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	//@PreAuthorize("hasAnyRole('USER')")
	public ResponseEntity<? extends BaseRes> readQuestion(
			@ApiIgnore Authentication authentication,
			@ApiParam(value="사전질문 리스트 조회할 방 id", required = true) @RequestParam String meetingroomId) {

		List<CustomQuestion> customQuestionList = customQuestionService.readAllCustomQuestionList(meetingroomId);
		List<Question> questionList = questionService.read20QuestionList();

		return ResponseEntity.ok(QuestionListRes.of(200, "Success", customQuestionList, questionList));
	}


	@PostMapping("/custom")
	@ApiOperation(value = "사전 질문 생성", notes = "<strong>방 정보, 내용</strong>을 입력하여 사전질문을 추가한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	//@PreAuthorize("hasAnyRole('USER')")
	public ResponseEntity<? extends BaseRes> createCustomQuestion(
			@ApiIgnore Authentication authentication,
			@RequestBody @ApiParam(value="사전질문 생성 정보", required = true) CustomQuestionCreateReq customQuestionCreateReq) {

		int results_num = customQuestionService.createCustomQuestion(customQuestionCreateReq);

		if(results_num == 0) return ResponseEntity.status(200).body(BaseRes.of(200, "사전 질문 생성 성공."));
//		else if(results_num == 1) return ResponseEntity.status(401).body(BaseRes.of(401, "이미 가입된 아이디입니다."));
//		else return ResponseEntity.status(401).body(BaseRes.of(401, "예상치 못한 결과입니다."));

		return ResponseEntity.status(401).body(BaseRes.of(401, "예상치 못한 결과입니다."));
	}


	@PutMapping("/custom")
	@ApiOperation(value = "사전 질문 수정", notes = "<strong>사전질문 id, 내용</strong>을 입력하여 사전질문을 수정한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	//@PreAuthorize("hasAnyRole('USER')")
	public ResponseEntity<? extends BaseRes> updateCustomQuestion(
			@ApiIgnore Authentication authentication,
			@RequestBody @ApiParam(value="사전질문 수정 정보", required = true)CustomQuestionUpdateReq customQuestionUpdateReq) {

		int results_num = customQuestionService.updateCustomQuestion(customQuestionUpdateReq);

		if(results_num == 0) return ResponseEntity.status(200).body(BaseRes.of(200, "사전 질문 수정 성공."));
		//else if(results_num == 1) return ResponseEntity.status(401).body(BaseRes.of(401, "등록되지 않은 아이디입니다."));
		// else return ResponseEntity.status(401).body(BaseRes.of(401, "예상치 못한 결과입니다."));

		return ResponseEntity.status(401).body(BaseRes.of(401, "예상치 못한 결과입니다."));
	}

	@DeleteMapping("/custom")
	@ApiOperation(value = "사전 질문 삭제", notes = "<strong> 사전질문 id </strong>를 입력하여 사전질문을 삭제한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	//@PreAuthorize("hasAnyRole('USER')")
	public ResponseEntity<? extends BaseRes> deleteCustomQuestion(
			@ApiIgnore Authentication authentication,
			@ApiParam(value="삭제할 사전질문 id", required = true) @RequestParam Long id) {

		int results_num = customQuestionService.deleteCustomQuestion(id);

		if(results_num==0) return ResponseEntity.status(200).body(BaseRes.of(200, "사전질문 삭제 성공."));
		//else if(results_num==1) return ResponseEntity.status(401).body(BaseRes.of(401, "등록되지 않은 아이디입니다."));
		//else return ResponseEntity.status(401).body(BaseRes.of(401, "예상치 못한 결과입니다."));
		return ResponseEntity.status(401).body(BaseRes.of(401, "예상치 못한 결과입니다."));
	}

	@DeleteMapping("/custom/all")
	@ApiOperation(value = "사전 질문 모두 삭제", notes = "<strong> 방정보 id </strong>를 입력하여 해당 방의 사전질문을 모두 삭제한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	//@PreAuthorize("hasAnyRole('USER')")
	public ResponseEntity<? extends BaseRes> deleteAllCustomQuestion(
			@ApiIgnore Authentication authentication,
			@ApiParam(value="사전질문을 모두 삭제할 방 id", required = true) @RequestParam String meetingroomId) {

		int results_num = customQuestionService.deleteAllCustomQuestion(meetingroomId);

		if(results_num==0) return ResponseEntity.status(200).body(BaseRes.of(200, "해당 방 사전질문 모두 삭제 성공."));
		//else if(results_num==1) return ResponseEntity.status(401).body(BaseRes.of(401, "등록되지 않은 아이디입니다."));
		//else return ResponseEntity.status(401).body(BaseRes.of(401, "예상치 못한 결과입니다."));
		return ResponseEntity.status(401).body(BaseRes.of(401, "예상치 못한 결과입니다."));
	}

	@PutMapping("/past")
	@ApiOperation(value="선택된 질문 카운트 올리기", notes="선택된 질문을 카운트 1 올린다.")
	@ApiResponses({
			@ApiResponse(code=200, message = "성공"),
			@ApiResponse(code=401, message = "인증 실패"),
			@ApiResponse(code=404, message = "사용자 없음"),
			@ApiResponse(code=500, message = "서버 오류"),
	})
	//@PreAuthorize("hasAnyRole('USER')")
	public ResponseEntity<? extends BaseRes> selectedQusetion(
			@ApiIgnore Authentication authentication,
			@RequestBody @ApiParam(value="선택된 질문 id", required = true)  QuestionSelectReq questionSelectReq){

		int results_num = questionService.selectedQuestionAddCnt1(questionSelectReq);

		if(results_num==0) return ResponseEntity.status(200).body(BaseRes.of(200, "선택된 질문 카운트 +1."));

		return ResponseEntity.status(401).body(BaseRes.of(401, "예상치 못한 결과입니다."));
	}

	@PutMapping("/relation")
	@ApiOperation(value="연관 질문 카운트 올리기", notes="연관 질문을 등록하거나 카운트 1 올린다.")
	@ApiResponses({
			@ApiResponse(code=200, message = "성공"),
			@ApiResponse(code=401, message = "인증 실패"),
			@ApiResponse(code=404, message = "사용자 없음"),
			@ApiResponse(code=500, message = "서버 오류"),
	})
	//@PreAuthorize("hasAnyRole('USER')")
	public ResponseEntity<? extends BaseRes>  relationQusetion(
			@ApiIgnore Authentication authentication,
			@RequestBody @ApiParam(value="연관 부모, 자식 질문 id", required = true) RelationQuestionUpdateReq relationQuestionUpdateReq){

		int results_num = relationQuestionService.relationQuestionAddCnt1(relationQuestionUpdateReq);

		if(results_num==0) return ResponseEntity.status(200).body(BaseRes.of(200, "연관 질문 카운트 +1."));
		
		return ResponseEntity.status(401).body(BaseRes.of(401, "예상치 못한 결과입니다."));
	}

}
