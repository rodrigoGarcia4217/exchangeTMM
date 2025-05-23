package com.arinco.exchangeRate.base.utils;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AbstractManagement {
    private Integer idUser;
	private String operation;
	private Date managmentDate;
	private String log;
	private String userName;
	

}
