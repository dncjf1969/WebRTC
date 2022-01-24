package com.wish.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wish.api.request.MemberLoginPostReq;
import com.wish.api.request.MemberRegisterPostReq;
import com.wish.api.request.MemberTestReq;
import com.wish.api.request.UserLoginPostReq;
import com.wish.api.response.LoginPostRes;
import com.wish.api.response.MemberLoginPostRes;
import com.wish.api.response.MemberRes;
import com.wish.api.service.MemberService;
import com.wish.common.auth.SsafyUserDetails;
import com.wish.common.model.response.BaseResponseBody;
import com.wish.common.util.JwtTokenUtil;
import com.wish.db.entity.Member;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;


@Api(value = "유저 관련 API", tags = {"User"})
@RestController
@RequestMapping("/members")
public class MemberController {
	
	@Autowired
	MemberService memberService;
	
	@PostMapping("/signup")
	@ApiOperation(value = "회원 가입", notes = "<strong>아이디, 패스워드, 이름, 이메일</strong>를 입력하여 회원가입한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<? extends BaseResponseBody> register(
			@RequestBody @ApiParam(value="회원가입 정보", required = true) MemberRegisterPostReq registerInfo) {
		
		//임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
		Member member = memberService.createMember(registerInfo);
		
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}
	
	@PostMapping("/login")
	@ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 입력하여 로그인한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<? extends BaseResponseBody> login(
			@RequestBody @ApiParam(value="로그인 정보", required = true) MemberLoginPostReq loginInfo) {
		
		String userId = loginInfo.getId();
		//임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
		if(memberService.loginMember(loginInfo)) return ResponseEntity.ok(LoginPostRes.of(200, "Success", JwtTokenUtil.getToken(userId)));

		//		return ResponseEntity.ok(MemberLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(userId)));
		else return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Fail"));
	}
	
	
	@GetMapping("/me")
	@ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<MemberRes> getUserInfo(@ApiIgnore Authentication authentication) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 */
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String id = userDetails.getUsername();
		Member member = memberService.getMemberById(id);
		
		return ResponseEntity.status(200).body(MemberRes.of(member));
	}
	
	
	
	//test
	@PostMapping("/me2")
	@ApiOperation(value = "로그인 테스트용", notes = "테스트용 입니다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<MemberRes> postTest(
			@RequestBody @ApiParam(value="로그인 정보 테스트용", required = true) MemberTestReq testInfo) {
		
		Member member = memberService.getMembertest2(testInfo);
		
		return ResponseEntity.status(200).body(MemberRes.of(member));
	}
	
	
}
