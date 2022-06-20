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
@ApiModel("RoomMysqlIdRes")
public class RoomMysqlIdRes extends BaseRes{
	@ApiModelProperty(name="리스트에서 사용하는 room id", example="1")
	Long roomIdMysql;

	public static RoomMysqlIdRes of(Long roomIdMysql) {
		RoomMysqlIdRes res = new RoomMysqlIdRes();
		res.setRoomIdMysql(roomIdMysql);
		return res;
	}
}
