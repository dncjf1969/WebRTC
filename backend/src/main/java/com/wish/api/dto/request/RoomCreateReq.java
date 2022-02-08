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
@ApiModel("WaitingroomCreateReq")
public class RoomCreateReq {
	@ApiModelProperty(name="방 이름", example="OO기업 인적성 면접 준비방")
	String name;

	@ApiModelProperty(name="면접 종류", example="인적성")
	String type;

	@ApiModelProperty(name="직무 종류", example="IT")
	String job;
	
	@ApiModelProperty(name="방장 id", example="chris1225")
	String manager;
	
	@ApiModelProperty(name="최대인원", example="6")
	int memberMax;
	
	@ApiModelProperty(name="방 비밀번호", example="0000")
	String password;
}
