package com.wish.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;

@Api(value = "피드백 관련 API", tags = {"Feedback"})
@RestController
@RequestMapping("/feedback")
public class FeedbackController {

}
