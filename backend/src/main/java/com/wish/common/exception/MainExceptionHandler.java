package com.wish.common.exception;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

import com.wish.api.dto.response.BaseRes;
import com.wish.common.exception.custom.FeedbackException;
import com.wish.common.exception.custom.MemberException;
import com.wish.common.exception.custom.QuestionException;
import com.wish.common.exception.custom.RoomException;

/*
 * 
 * SPA처리를 위한 ControllerAdvice.
 * 요청에 해당하는 Request Mapping이 존재하지 않을 경우 Default로 index.html을 렌더링한다.
 * 
 */

@ControllerAdvice
public class MainExceptionHandler {
//	@Value("${spa.default-file}")
//	String defaultFile;
	 
	
	@ExceptionHandler(RoomException.class)
    protected ResponseEntity<BaseRes> handleBusinessException(final RoomException e) {
        //log.error("handleBusinessException", e);
        final ErrorCode errorCode = e.getErrorCode();
        final BaseRes response = BaseRes.of(errorCode);
        return new ResponseEntity<>(response, HttpStatus.valueOf(errorCode.getStatusCode()));
    }
	
	@ExceptionHandler(MemberException.class)
    protected ResponseEntity<BaseRes> handleBusinessException(final MemberException e) {
        //log.error("handleBusinessException", e);
        final ErrorCode errorCode = e.getErrorCode();
        final BaseRes response = BaseRes.of(errorCode);
        return new ResponseEntity<>(response, HttpStatus.valueOf(errorCode.getStatusCode()));
    }
	
	@ExceptionHandler(FeedbackException.class)
    protected ResponseEntity<BaseRes> handleBusinessException(final FeedbackException e) {
        //log.error("handleBusinessException", e);
        final ErrorCode errorCode = e.getErrorCode();
        final BaseRes response = BaseRes.of(errorCode);
        return new ResponseEntity<>(response, HttpStatus.valueOf(errorCode.getStatusCode()));
    }
	
	@ExceptionHandler(QuestionException.class)
    protected ResponseEntity<BaseRes> handleBusinessException(final QuestionException e) {
        //log.error("handleBusinessException", e);
        final ErrorCode errorCode = e.getErrorCode();
        final BaseRes response = BaseRes.of(errorCode);
        return new ResponseEntity<>(response, HttpStatus.valueOf(errorCode.getStatusCode()));
    }
	
}
