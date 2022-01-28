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
@ApiModel("WaitingroomManagerReq")
public class WaitingroomManagerReq {
	@ApiModelProperty(name="방 id", example="12")
	int roomId; 
	
	@ApiModelProperty(name="방장 id", example="chris1225")
	String managerToken;

	@ApiModelProperty(name="다음 방장 id", example="joe123")
	String nextManagerId;
	
	
}
