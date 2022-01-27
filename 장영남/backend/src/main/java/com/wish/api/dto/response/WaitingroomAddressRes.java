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
@ApiModel("WaitingroomAddressRes")
public class WaitingroomAddressRes extends BaseRes{
	@ApiModelProperty(name="방 주소", example="wss://192.168.99.100:4443/openvidu")
	String address;

	public static WaitingroomAddressRes of(String address) {
		WaitingroomAddressRes res = new WaitingroomAddressRes();
		res.setAddress(address);
		return res;
	}
}
