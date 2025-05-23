package com.arinco.exchangeRate.base.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.arinco.exchangeRate.base.Model.AppLog;
import com.arinco.exchangeRate.base.converter.AppLogConverter;
import com.arinco.exchangeRate.base.dto.AppLogDto;
import com.arinco.exchangeRate.base.exception.ConverterException;
import com.arinco.exchangeRate.base.repository.IAppLogRepository;
import com.arinco.exchangeRate.base.service.core.IAppLogService;
import com.arinco.exchangeRate.base.utils.HibernateProxyTypeAdapter;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@Transactional
@Service("appLogService")
public class AppLogService implements IAppLogService{

	@Autowired
	private IAppLogRepository appLogRepository;
	
	@Autowired
	private AppLogConverter appLogConverter;
	
	@Override
	public Gson GsonProvider() {
		Gson gson = new GsonBuilder().setExclusionStrategies()
				.registerTypeAdapterFactory(HibernateProxyTypeAdapter.FACTORY)
				.create();
		return gson;
	}

	@Override
	public void registerList(List<AppLogDto> appLogList) throws ConverterException{
		List<AppLog> entities = new ArrayList<AppLog>();
	    Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis()); // Obtiene la marca de tiempo actual

		for(AppLogDto appLogDto : appLogList) {
			AppLog entity = appLogConverter.convert(appLogDto);
	        entity.setManagementDate(currentTimestamp); // Establece la marca de tiempo actual en cada entidad
			entities.add(entity);
		}
		appLogRepository.saveAll(entities);
	}

	@Override
	public void registerLog(AppLogDto appLogDto) throws ConverterException{
	    Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis()); // Obtiene la marca de tiempo actual
		AppLog entity = appLogConverter.convert(appLogDto);
        entity.setManagementDate(currentTimestamp); // Establece la marca de tiempo actual en cada entidad
		appLogRepository.save(entity);
	}
	


}
