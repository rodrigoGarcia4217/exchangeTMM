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
public class TrailerEvidenceConst {

	public static final String UNKNOWN_TYPE = "DESCONOCIDO";
	
	public static final String PRUEBA_FISICOMECANICA = "Prueba Fisicomecanica";
	public static final int PRUEBA_FISICOMECANICA_INT = 1;
	
	public static final String PRUEBA_HIDROESTATICA = "Prueba Hidroestatica";
	public static final int PRUEBA_HIDROESTATICA_INT = 2; 
	
	public static final String PRUEBA_ESPESOR = "Prueba de Espesor";
	public static final int PRUEBA_ESPESOR_INT = 3; 
	
	public static final String VALVULA_ALIVIO = "Válvula de Alivio (UPV)";
	public static final int VALVULA_ALIVIO_INT = 4; 
	
	public static final String MANOMETROS = "Manómetros";
	public static final int MANOMETROS_INT = 5; 
	
	public static final String MANGUERAS = "Mangueras ";
	public static final int MANGUERAS_INT = 6; 
	
	public static final String FACTURA = "Factura";
	public static final int FACTURA_INT = 7; 
	
	public static final String PEDIMENTO = "Pedimento";
	public static final int PEDIMENTO_INT = 8; 
	
	public static final String PERMOSO_SCT = "Permiso SCT";	
	public static final int PERMOSO_SCT_INT = 9; 

	public static final String TARJETA_CIRCULACION = "Tarjeta Circulacion";	
	public static final int TARJETA_CIRCULACION_INT = 10; 
	
	public static String getTypeDescription(int type) {
		switch(type) {
		case 1: return PRUEBA_FISICOMECANICA;
		case 2: return PRUEBA_HIDROESTATICA;
		case 3: return PRUEBA_ESPESOR;
		case 4: return VALVULA_ALIVIO;
		case 5: return MANOMETROS;
		case 6: return MANGUERAS;
		case 7: return FACTURA;
		case 8: return PEDIMENTO;
		case 9: return PERMOSO_SCT;
		case 10: return TARJETA_CIRCULACION;
		default: return UNKNOWN_TYPE;
		}
	}
}
