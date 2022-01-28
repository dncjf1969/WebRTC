package com.wish.api.dto.response;

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
@ApiModel("WaitingroomTokenRes")
public class WaitingroomTokenRes extends BaseRes{
	@ApiModelProperty(name="방 토큰(주소)", example="wss://192.168.99.100:4443/openvidu")
	String token;

	public static WaitingroomTokenRes of(String token) {
		WaitingroomTokenRes res = new WaitingroomTokenRes();
		res.setToken(token);
		return res;
	}
}
