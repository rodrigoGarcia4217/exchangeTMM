package com.arinco.exchangeRate.base.converter;

import org.springframework.stereotype.Component;

import com.arinco.exchangeRate.base.Model.NeoRoles;
import com.arinco.exchangeRate.base.dto.RolesDto;
import com.arinco.exchangeRate.base.exception.ConverterException;

@Component("rolesConverter")
public class RolesConverter implements IConverter<NeoRoles, RolesDto>{

	@Override
	public NeoRoles convert(RolesDto to) throws ConverterException {
		NeoRoles entity = NeoRoles.builder()
				.roleId(to.getRoleId())
				.roleName(to.getRoleName())
				.build();
		return entity;
	}

	@Override
	public RolesDto convert(NeoRoles entity) throws ConverterException {
		RolesDto to = RolesDto.builder()
				.roleId(entity.getRoleId())
				.roleName(entity.getRoleName())
				.build();
		return to;
	}

}
