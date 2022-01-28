package com.wish.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("WaitingroomModifyReq")
public class WaitingroomModifyReq {
	@ApiModelProperty(name="방 id", example="1")
	int roomId;
	
	@ApiModelProperty(name="방 이름", example="OO기업 인적성 면접 준비방")
	String name;

	@ApiModelProperty(name="면접 종류", example="인적성")
	String type;
	
	@ApiModelProperty(name="직무 종류", example="IT")
	String job;
	
	@ApiModelProperty(name="참여자 최대", example="6")
	int memberMax;
	
	@ApiModelProperty(name="방 비밀번호", example="0000")
	String password;
	
	@ApiModelProperty(name="방 수정 요청자 jwt", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJ3aXNoLmNvbSIsImV4cCI6MTY0NDU4MjU5MCwiaWF0IjoxNjQzMjg2NTkwLCJtZW1iZXJJZCI6ImEifQ.1pFw5XxwiatQY8GPl701vTfLH-twM-3iUIOyZGnBdoeCc5Y13ZiLmjpPBXOcH6VW8u3a1EmV0B9rdGnfXPRH-g")
	String jwt;

}
