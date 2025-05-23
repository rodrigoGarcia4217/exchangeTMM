package com.arinco.exchangeRate.base.service.core;

import java.io.ByteArrayInputStream;
import java.io.IOException;

public interface IExchangeRateExcelService {
    ByteArrayInputStream generateExchangeExcel() throws IOException;
}
