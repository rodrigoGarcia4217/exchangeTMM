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
public class CraneEvidenceConst {

	public static final String UNKNOWN_TYPE = "DESCONOCIDO";
	
	public static final String TECNICA_GRILLETES = "Fichas Técnicas de Grilletes";
	public static final int TECNICA_GRILLETES_INT = 1;
	
	public static final String TECNICA_GANCHOS = "Fichas Técnicas de Ganchos";
	public static final int ITECNICA_GANCHOS_INT = 2; 
	
	public static final String TECNICA_ESTROBO = "Ficha Tecnica de Estrobo";
	public static final int TECNICA_ESTROBO_INT = 3; 
	
	public static final String TECNICA_ESLIGAS = "Ficha Tecnica de Esligas";
	public static final int TECNICA_ESLIGAS_INT = 4; 
	
	public static final String CERTIFICADO_INSPECCION = "Certificado de inspeccion";
	public static final int CERTIFICADO_INSPECCION_INT = 5; 
	
	public static final String POLIZA_SEGURO= "Poliza de Seguro";
	public static final int POLIZA_SEGURO_INT = 6; 
	
	public static final String FACTURA = "Factura";
	public static final int FACTURA_INT = 7; 
	
	public static final String PEDIMENTO = "Pedimento";
	public static final int PEDIMENTO_INT = 8; 
	
	public static final String TARJETA_CIRCULACION = "Tarjeta de circulacion";	
	public static final int TARJETA_CIRCULACION_INT = 9; 

	
	public static String getTypeDescription(int type) {
		switch(type) {
		case 1: return TECNICA_GRILLETES;
		case 2: return TECNICA_GANCHOS;
		case 3: return TECNICA_ESTROBO;
		case 4: return TECNICA_ESLIGAS;
		case 5: return CERTIFICADO_INSPECCION;
		case 6: return POLIZA_SEGURO;
		case 7: return FACTURA;
		case 8: return PEDIMENTO;
		case 9: return TARJETA_CIRCULACION;
		default: return UNKNOWN_TYPE;
		}
	}
}
