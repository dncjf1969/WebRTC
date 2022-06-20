package com.wish.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@ApiModel("MemberLoginReq")
public class MemberLoginReq {
	@ApiModelProperty(name="유저 ID", example="ssafy_web")
	String id;
	@ApiModelProperty(name="유저 Password", example="your_password")
	String password;
	@Override
	public String toString() {
		return "MemberLoginReq [id=" + id + ", password=" + password + "]";
	}
	
	
}
