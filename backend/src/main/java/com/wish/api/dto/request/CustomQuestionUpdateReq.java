package com.wish.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("CustomQuestionUpdateReq")
public class CustomQuestionUpdateReq {
    @ApiModelProperty(name="질문 id", example="4")
    Long id;
    @ApiModelProperty(name="질문 내용", example="자기소개해보세요")
    String content;
}
