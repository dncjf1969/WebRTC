package com.wish.api.service;

import com.wish.api.dto.response.MeetingCountRes;


public interface MeetingService {

	MeetingCountRes getMeetingCounts(String meetin);

}

