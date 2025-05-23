package com.arinco.exchangeRate.base.service.core;

import java.util.List;

import com.arinco.exchangeRate.base.dto.AppLogDto;
import com.arinco.exchangeRate.base.exception.ConverterException;
import com.google.gson.Gson;

public interface IAppLogService {

	Gson GsonProvider();

	/**
	 * @param appLogList
	 */
	void registerList(List<AppLogDto> appLogList) throws ConverterException;

	/**
	 * @param appLog
	 */
	void registerLog(AppLogDto appLogDto) throws ConverterException;

}
