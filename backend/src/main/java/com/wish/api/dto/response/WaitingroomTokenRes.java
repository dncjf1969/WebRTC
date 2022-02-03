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
	

	@ApiModelProperty(name="리스트에서 사용하는 room id", example="1")
	int roomId;

	public static WaitingroomTokenRes of(String token, int roomId) {
		WaitingroomTokenRes res = new WaitingroomTokenRes();
		res.setToken(token);
		res.setRoomId(roomId);
		return res;
	}
}
