package com.arinco.exchangeRate.base.converter;

import com.arinco.exchangeRate.base.Model.IModel;
import com.arinco.exchangeRate.base.dto.ITransferObject;
import com.arinco.exchangeRate.base.exception.ConverterException;

public interface IConverter <M extends IModel, T extends ITransferObject>{

	M convert(T to) throws ConverterException;
	
	T convert(M entity) throws ConverterException;

}
