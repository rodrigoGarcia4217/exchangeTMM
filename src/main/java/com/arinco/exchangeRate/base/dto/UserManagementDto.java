package com.arinco.exchangeRate.base.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * @author Josué Moreno (Ar.In.Co. - Desarrollo de Software)
 * @version 1.0 Date Creation: 26 may. 2024
 * 
 */
@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor

public class UserManagementDto implements ITransferObject{

	private static final long serialVersionUID = 1L;
	
	private Integer userId;
	private String userName;
	private List<String> userRoles;
	private Boolean active;
}
