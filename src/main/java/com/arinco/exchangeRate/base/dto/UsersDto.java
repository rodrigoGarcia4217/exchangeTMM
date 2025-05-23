package com.arinco.exchangeRate.base.dto;

import com.arinco.exchangeRate.base.utils.AbstractManagement;

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
public class UsersDto extends AbstractManagement implements ITransferObject{

	private static final long serialVersionUID = 1L;
	
	private Integer userId;
	private String userName; 
	private String encrytedPassword; 
	private Boolean changePassword; 
	private Boolean active;
}