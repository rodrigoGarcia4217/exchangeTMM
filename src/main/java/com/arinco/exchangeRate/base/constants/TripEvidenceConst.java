/**
 * Copyright (c) 2023 Ar.In.Co; All rights reserved. This software contains confidential information
 * owned by Ar.In.Co. and therefore can not be reproduced, distributed or altered without the prior
 * consent of Ar.In.Co
 */
package com.arinco.exchangeRate.base.constants;

/**
 * @author Josué Moreno (Ar.In.Co. - Desarrollo de Software)
 * @version 1.0 Date Creation: 29 ago 2023
 * 
 */
public class TripEvidenceConst {

	public static final String UNKNOWN_TYPE = "DESCONOCIDO";
	
	public static final String BASE_DEPARTURE_TEXT = "Salida de Base";
	public static final int BASE_DEPARTURE_INT = 1;
	
	public static final String PLANT_ARRIVE_TEXT = "Llegada a planta";
	public static final int PLANT_ARRIVE_INT = 2; 
	
	public static final String INIT_CHARGE_TEXT = "Inicia Carga";
	public static final int INIT_CHARGE_INT = 3; 
	
	public static final String FINISH_CHARGE_TEXT = "Termina Carga";
	public static final int FINISH_CHARGE_INT = 4; 
	
	public static final String PLANT_DEPARTURE_TEXT = "Salida Planta";
	public static final int PLANT_DEPARTURE_INT = 5; 
	
	public static final String PIT_ARRIVE_TEXT = "Llegada Pozo";
	public static final int PIT_ARRIVE_INT = 6; 
	
	public static final String INIT_DECHARGE_TEXT = "Inicia Descarga";
	public static final int INIT_DECHARGE_INT = 7; 
	
	public static final String FINISH_DECHARGE_TEXT = "Termina Descarga";
	public static final int FINISH_DECHARGE_INT = 8; 
	
	public static final String PIT_DEPARTURE_TEXT = "Salida Pozo";	
	public static final int PIT_DEPARTURE_INT = 9;
	
	public static final String ORDER_SERVICE_TEXT = "Orden de servicio";	
	public static final int ORDER_SERVICE_INT = 10;
	
	public static final String ORDER_FOLIO_TEXT = "Papeleta";	
	public static final int ORDER_FOLIO_INT = 11;
	public static String getTypeDescription(int type) {
		switch(type) {
		case 1: return BASE_DEPARTURE_TEXT;
		case 2: return PLANT_ARRIVE_TEXT;
		case 3: return INIT_CHARGE_TEXT;
		case 4: return FINISH_CHARGE_TEXT;
		case 5: return PLANT_DEPARTURE_TEXT;
		case 6: return PIT_ARRIVE_TEXT;
		case 7: return INIT_DECHARGE_TEXT;
		case 8: return FINISH_DECHARGE_TEXT;
		case 9: return PIT_DEPARTURE_TEXT;
		case 10: return ORDER_SERVICE_TEXT;
		case 11: return ORDER_FOLIO_TEXT;

		default: return UNKNOWN_TYPE;
		}
	}
}
