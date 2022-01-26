package com.wish.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("CustomQuestionCreateReq")
public class CustomQuestionCreateReq {
    @ApiModelProperty(name="대기방 id", example="abcd123")
    String meetingroomId;
    @ApiModelProperty(name="질문 내용", example="자기소개해보세요")
    String content;
}
