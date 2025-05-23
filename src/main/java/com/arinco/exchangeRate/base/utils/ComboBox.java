package com.arinco.exchangeRate.base.utils;

import com.arinco.exchangeRate.base.dto.ITransferObject;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ComboBox implements ITransferObject {
	
	private static final long serialVersionUID = 1L;
	
	private Integer id;
	private String description;
	private String aditional;

}
