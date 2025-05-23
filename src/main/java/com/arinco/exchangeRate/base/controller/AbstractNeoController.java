package com.arinco.exchangeRate.base.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.arinco.exchangeRate.base.dto.LoggedUserDto;
import com.arinco.exchangeRate.base.service.core.IUserManagementService;
import com.arinco.exchangeRate.base.utils.DateManagement;
import com.arinco.exchangeRate.base.utils.MediaInfoUtil;

public class AbstractNeoController {
    public static final String EMPTY = "";
	public static final String PREFIX_EXCHANGE = "/exchange/";



    @Autowired
	private IUserManagementService userManagementService;
	
	@ModelAttribute("loggedUser")
	public LoggedUserDto getLoggedUser() {
		LoggedUserDto loggedUserDto = new LoggedUserDto();
		loggedUserDto.setCurrentDate(DateManagement.today("/"));
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (!(auth instanceof AnonymousAuthenticationToken)) {
			loggedUserDto.setUserName(auth.getName());
			try {
	            loggedUserDto.setUserId(Integer.valueOf(loggedUserDto.getUserName() != null ? userManagementService.getUserId(loggedUserDto.getUserName()).toString() : "9999")); //anonymoususer
	            //loggedUserDto.setChangePassword(userManagementService.getChangePassword(loggedUserDto.getUserName()));
	        } catch (NumberFormatException e) {
	        	loggedUserDto.setUserId(9998);
	        }
		} else {
			loggedUserDto.setUserName("anonymus");
		}
		return loggedUserDto;
	}

	public MediaInfoUtil getMediaInfo(String documentType) {
		MediaInfoUtil info = new MediaInfoUtil();
		switch(documentType) {
		case "application/pdf": 
			info.setType(MediaType.APPLICATION_PDF);
			info.setExtension(".pdf");
			break;
		case "image/png":
			info.setType(MediaType.IMAGE_PNG);
			info.setExtension(".png");
			break;
		case "image/jpeg":
			info.setType(MediaType.IMAGE_JPEG);
			info.setExtension(".jpg");
			break;
		}
		return info;
	}


}
