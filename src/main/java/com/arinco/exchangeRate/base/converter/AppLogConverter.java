package com.arinco.exchangeRate.base.converter;

import org.springframework.stereotype.Component;

import com.arinco.exchangeRate.base.Model.AppLog;
import com.arinco.exchangeRate.base.dto.AppLogDto;
import com.arinco.exchangeRate.base.exception.ConverterException;

@Component("appLogConverter")
public class AppLogConverter implements IConverter<AppLog, AppLogDto>{

	@Override
	public AppLog convert(AppLogDto to) throws ConverterException {
		AppLog entity = AppLog.builder()
				.id(to.getId())
				.userId(to.getUserId())
				.managementDate(to.getManagementDate())
				.operation(to.getOperation())
				.tableName(to.getTableName())
				.prevState(to.getPrevState())
				.newState(to.getNewState())
				.build();
		return entity;
	}

	@Override
	public AppLogDto convert(AppLog entity) throws ConverterException {
		AppLogDto to = AppLogDto.builder()
				.id(entity.getId())
				.userId(entity.getUserId())
				.managementDate(entity.getManagementDate())
				.operation(entity.getOperation())
				.tableName(entity.getTableName())
				.prevState(entity.getPrevState())
				.newState(entity.getNewState())
				.build();
		return to;
	}

}
