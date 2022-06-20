package com.wish.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("RelationQuestionUpdateReq")
public class RelationQuestionUpdateReq {
    @ApiModelProperty(name="부모 질문 id", example="1")
    Long parentId;
    @ApiModelProperty(name="자식 질문 id", example="3")
    Long childId;


}
