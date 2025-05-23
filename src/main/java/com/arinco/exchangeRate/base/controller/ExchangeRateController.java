package com.arinco.exchangeRate.base.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.arinco.exchangeRate.base.service.core.IExchangeRateExcelService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping(ExchangeRateController.HOME)
public class ExchangeRateController extends AbstractNeoController {

	public static final String HOME = PREFIX_EXCHANGE + "exchangeRate";

	

	@Autowired
	private IExchangeRateExcelService exchangeRateExcelService;

 	@GetMapping(EMPTY)
 	public String onLoadHome() {
 		return HOME;
 	}
 	
	
		@GetMapping("/download")
   		public ResponseEntity<byte[]> downloadExcel() throws IOException {
        	ByteArrayInputStream stream = exchangeRateExcelService.generateExchangeExcel();
        	byte[] content = stream.readAllBytes();

			HttpHeaders headers = new HttpHeaders();
			headers.setContentDisposition(ContentDisposition.attachment().filename("exchange_rates.xlsx").build());
			headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);

			return ResponseEntity.ok()
					.headers(headers)
					.body(content);
    	}	
		
}
