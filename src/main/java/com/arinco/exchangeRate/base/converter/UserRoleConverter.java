package com.arinco.exchangeRate.base.converter;

import org.springframework.stereotype.Component;

import com.arinco.exchangeRate.base.Model.NeoUserRole;
import com.arinco.exchangeRate.base.dto.UserRoleDto;
import com.arinco.exchangeRate.base.exception.ConverterException;

@Component("userRoleConverter")
public class UserRoleConverter implements IConverter<NeoUserRole, UserRoleDto>{

	@Override
	public NeoUserRole convert(UserRoleDto to) throws ConverterException {
		NeoUserRole entity = NeoUserRole.builder()
				.id(to.getId())
				.userId(to.getUserId())
				.roleId(to.getRoleId())
				.build();
		return entity;
	}

	@Override
	public UserRoleDto convert(NeoUserRole entity) throws ConverterException {
		UserRoleDto to = UserRoleDto.builder()
				.id(entity.getId())
				.userId(entity.getUserId())
				.roleId(entity.getRoleId())
				.build();
		return to;
	}

}
