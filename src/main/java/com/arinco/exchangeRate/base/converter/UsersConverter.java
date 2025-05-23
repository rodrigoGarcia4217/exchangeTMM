package com.arinco.exchangeRate.base.converter;

import org.springframework.stereotype.Component;

import com.arinco.exchangeRate.base.Model.NeoUsers;
import com.arinco.exchangeRate.base.dto.UsersDto;
import com.arinco.exchangeRate.base.exception.ConverterException;

@Component("usersConverter")
public class UsersConverter implements IConverter<NeoUsers, UsersDto>{

	@Override
	public NeoUsers convert(UsersDto to) throws ConverterException {
		NeoUsers entity = NeoUsers.builder()
				.userId(to.getUserId())
				.userName(to.getUserName()) 
				.encrytedPassword(to.getEncrytedPassword()) 
				.changePassword(to.getChangePassword()) 
				.active(to.getActive())
				.build();
		return entity;
	}

	@Override
	public UsersDto convert(NeoUsers entity) throws ConverterException {
		UsersDto to = UsersDto.builder()
				.userId(entity.getUserId())
				.userName(entity.getUserName()) 
				.encrytedPassword(entity.getEncrytedPassword()) 
				.changePassword(entity.getChangePassword()) 
				.active(entity.getActive())
				.build();
		return to;
	}

}
