package com.wish.api.response;

import com.wish.db.entity.CustomQuestion;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("CustomQuestionReadRes")
public class CustomQuestionReadRes extends BaseRes{
    List<CustomQuestion> questionList;

    public static CustomQuestionReadRes of(int statusCode, String message, List<CustomQuestion> list) {
        CustomQuestionReadRes res = new CustomQuestionReadRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setQuestionList(list);
        return res;
    }
}
