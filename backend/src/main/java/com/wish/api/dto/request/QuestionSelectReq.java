package com.wish.api.dto.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("QuestionSelectReq")
public class QuestionSelectReq {
    @ApiModelProperty(name="질문 id", example="1")
    Long questionId;
}
