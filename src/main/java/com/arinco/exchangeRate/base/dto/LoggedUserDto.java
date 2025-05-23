package com.arinco.exchangeRate.base.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class LoggedUserDto implements ITransferObject {

	private static final long serialVersionUID = 1L;
	
	private Integer userId;
	private String userName; 
	private String currentDate;

}
