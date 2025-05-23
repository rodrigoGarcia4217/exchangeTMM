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
public class UnitsEvidenceConst {

	public static final String UNKNOWN_TYPE = "DESCONOCIDO";
	
	public static final String DICTAMEN_FISICOMECANICA = "Dictamen Fisicomecanica";
	public static final int DICTAMEN_FISICOMECANICA_INT = 1;
	
	public static final String DICTAMEN_CONTAMINANTE = "Dictamen contaminante";
	public static final int DICTAMEN_CONTAMINANTE_INT = 2; 
	
	public static final String FACTURA = "FACTURA";
	public static final int FACTURA_INT = 3; 
	
	public static final String PEDIMENTO = "Pedimento";
	public static final int PEDIMENTO_INT = 4; 
	
	public static final String PERMISO_ASEA = "Permiso Asea RME";
	public static final int PERMISO_ASEA_INT = 5; 
	
	public static final String PERMISO_SCT = "Permiso SCT ";
	public static final int PERMISO_SCT_INT = 6; 
	
	public static final String TARJETA_CIRCULACION = "Tarjeta de circulacion";
	public static final int TARJETA_CIRCULACION_INT = 7; 
	
	public static final String POLIZA_SEGURO = "Poliza de seguro";
	public static final int POLIZA_SEGURO_INT = 8; 
	
	public static final String PERMISO_ASEA_RP = "Permiso Asea RP";
	public static final int PERMISO_ASEA_RP_INT = 5; 
	
	
	public static String getTypeDescription(int type) {
		switch(type) {
		case 1: return DICTAMEN_FISICOMECANICA;
		case 2: return DICTAMEN_CONTAMINANTE;
		case 3: return FACTURA;
		case 4: return PEDIMENTO;
		case 5: return PERMISO_ASEA;
		case 6: return PERMISO_SCT;
		case 7: return TARJETA_CIRCULACION;
		case 8: return POLIZA_SEGURO;
		case 9: return PERMISO_ASEA_RP;

		default: return UNKNOWN_TYPE;
		}
	}
}
