package com.arinco.exchangeRate.base.utils;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * @author Josué Moreno (Ar.In.Co. - Desarrollo de Software)
 * @version 1.0 Date Creation: 27 may. 2024
 * 
 */
@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ResponseManagement implements Serializable {

	public static final long serialVersionUID  =1L;
	
	private Boolean success;
	private String errorCode;
	private String message;
	private String operation;
	private String log;
	
}