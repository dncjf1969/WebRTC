package com.wish.api.dto.response;

import java.util.List;

import com.wish.api.dto.WaitingRoom;

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
@ApiModel("WaitingroomResponse")
public class WaitingroomListRes extends BaseRes{
	@ApiModelProperty(name="WaitingRoom 객체 : 방제목, 종류, 최대인원, 현재인원", example="")
	List<WaitingroomSearchRes> list;

	public static WaitingroomListRes of(List<WaitingroomSearchRes> list) {
		WaitingroomListRes res = new WaitingroomListRes();
		res.setList(list);
		return res;
	}
}
