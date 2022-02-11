package com.wish.api.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("MeetingCountRes")
public class MeetingCountRes{
	@ApiModelProperty(name="면접 종류", example="인성")
	String type;

	@ApiModelProperty(name="횟수", example="3")
	Long count;
	
	public static MeetingCountRes of(String type, Long count) {
		MeetingCountRes res = new MeetingCountRes();
		res.setType(type);
		res.setCount(count);
		return res;
	}


//	public void setCount(Long count) {
//		long tmp = count;
//		this.count = (int)tmp;
//	}
	
	
}
