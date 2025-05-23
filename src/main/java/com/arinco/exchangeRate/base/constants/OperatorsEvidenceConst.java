package com.arinco.exchangeRate.base.constants;

public class OperatorsEvidenceConst {
    public static final String UNKNOWN_TYPE = "DESCONOCIDO";
	
	public static final String CONSTANCIA_LABORAL = "Constancia Laboral";
	public static final int BASE_CONSTANCIA_LABORAL_INT = 1;
	
	public static final String IDENTIFICACION_OFICIAL = "Identificación Oficial(INE)";
	public static final int IDENTIFICACION_OFICIAL_INT = 2; 
	
	public static final String IDENTIFICACION_EMPRESA = " Identificación de la Empresa";
	public static final int IDENTIFICACION_EMPRESA_INT = 3; 
	
	public static final String TITULO = "Título";
	public static final int TITULO_INT = 4; 
	
	public static final String CEDULA_PROFESIONAL = "Cédula Profesional";
	public static final int CEDULA_PROFESIONAL_INT = 5; 
	
	public static final String ALTA_IMSS= "Alta de IMSS";
	public static final int ALTA_IMSS_INT = 6; 
	
	public static final String VALE_ENTREGA_EPP = "Vales de entrega EPP";
	public static final int VALE_ENTREGA_EPP_INT = 7; 
	
	public static final String CERTIFICADO_MEDICO = "Certificado Médico";
	public static final int CERTIFICADO_MEDICO_INT = 8; 
	
	public static final String EXAMEN_ANTIDOPING = "Examen Antidoping";	
	public static final int EXAMEN_ANTIDOPING_INT = 9; 

	
	public static String getTypeDescription(int type) {
		switch(type) {
		case 1: return CONSTANCIA_LABORAL;
		case 2: return IDENTIFICACION_OFICIAL;
		case 3: return IDENTIFICACION_EMPRESA;
		case 4: return TITULO;
		case 5: return CEDULA_PROFESIONAL;
		case 6: return ALTA_IMSS;
		case 7: return VALE_ENTREGA_EPP;
		case 8: return CERTIFICADO_MEDICO;
		case 9: return EXAMEN_ANTIDOPING;
		default: return UNKNOWN_TYPE;
		}
	}

}
