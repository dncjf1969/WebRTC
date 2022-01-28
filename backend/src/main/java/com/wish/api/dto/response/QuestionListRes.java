package com.wish.api.dto.response;

import com.wish.db.entity.CustomQuestion;
import com.wish.db.entity.Question;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


//사전질문 + 기출질문 같이 클라이언트에게 보내준다.

@Getter
@Setter
@ApiModel("CustomQuestionReadRes")
public class QuestionListRes extends BaseRes{
    List<CustomQuestion> customQuestionList;
    List<Question> questionList;

    public static QuestionListRes of(int statusCode, String message, List<CustomQuestion> customQuestionList, List<Question> questionList) {
        QuestionListRes res = new QuestionListRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setCustomQuestionList(customQuestionList);
        res.setQuestionList(questionList);
        return res;
    }
}
