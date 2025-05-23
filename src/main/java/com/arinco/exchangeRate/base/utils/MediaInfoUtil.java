package com.arinco.exchangeRate.base.utils;

import org.springframework.http.MediaType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * @author Josué Moreno (Ar.In.Co. - Desarrollo de Software)
 * @version 1.0 Date Creation: 29 ago 2023
 * 
 */
@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class MediaInfoUtil {

	public static final String TAX_EVIDENCE = "ConstanciaFiscal_";
	
	MediaType type;
	String extension;

	

}
