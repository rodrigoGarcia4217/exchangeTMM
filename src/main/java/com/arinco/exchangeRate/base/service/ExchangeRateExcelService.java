package com.arinco.exchangeRate.base.service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.arinco.exchangeRate.base.service.core.IExchangeRateExcelService;

@Service("exchangeRateExcelService")
public class ExchangeRateExcelService implements IExchangeRateExcelService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public ByteArrayInputStream generateExchangeExcel() throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Tipo de Cambio");

        // Configurar el ancho de las columnas según solicitud
        sheet.setColumnWidth(0, 4 * 256);  // Columna A
        sheet.setColumnWidth(1, 5 * 256);  // Columna B
        sheet.setColumnWidth(2, 5 * 256);  // Columna C
        sheet.setColumnWidth(3, 8 * 256);  // Columna D
        sheet.setColumnWidth(4, 7 * 256);  // Columna E
        sheet.setColumnWidth(5, 1 * 256);  // Columna F
        sheet.setColumnWidth(6, 1 * 256);  // Columna G

        List<String[]> currencyPairs = List.of(
            new String[]{"USD", "MXN"},
            new String[]{"USD", "CAD"},
            new String[]{"USD", "EUR"},
            new String[]{"USD", "GBP"},
            new String[]{"USD", "SEK"},
            new String[]{"USD", "DKK"},
            new String[]{"USD", "NOK"},
            new String[]{"USD", "JPY"},
            new String[]{"USD", "HKD"},
            new String[]{"USD", "SGD"}
            // No agregamos MXN→USD aquí, lo hacemos después manualmente
        );

        int rowNum = 0;
        String today = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));

        double usdToMxnRate = 0.0;

        for (String[] pair : currencyPairs) {
            String from = pair[0];
            String to = pair[1];
            String url = String.format("https://api.frankfurter.app/latest?from=%s&to=%s", from, to);

            try {
                String response = restTemplate.getForObject(url, String.class);
                JSONObject json = new JSONObject(response);
                double rate = json.getJSONObject("rates").getDouble(to);

                if ("USD".equals(from) && "MXN".equals(to)) {
                    usdToMxnRate = rate;  // Guardamos esta tasa para MXN→USD
                }

                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue("M");
                row.createCell(1).setCellValue(from);
                row.createCell(2).setCellValue(to);
                row.createCell(3).setCellValue(today);
                row.createCell(4).setCellValue(rate);
                row.createCell(5).setCellValue(1);
                row.createCell(6).setCellValue(1);

            } catch (Exception e) {
                System.out.println("Error obteniendo tasa para " + from + " -> " + to + ": " + e.getMessage());
            }
        }

        // Agregar MXN → USD con el mismo valor que USD → MXN (no el inverso)
        if (usdToMxnRate > 0) {
            Row inverseRow = sheet.createRow(rowNum++);
            inverseRow.createCell(0).setCellValue("M");
            inverseRow.createCell(1).setCellValue("MXN");
            inverseRow.createCell(2).setCellValue("USD");
            inverseRow.createCell(3).setCellValue(today);
            inverseRow.createCell(4).setCellValue(usdToMxnRate); // Mismo valor
            inverseRow.createCell(5).setCellValue(1);
            inverseRow.createCell(6).setCellValue(1);
        }

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();

        return new ByteArrayInputStream(out.toByteArray());
    }
}
