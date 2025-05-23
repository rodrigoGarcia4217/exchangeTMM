package com.arinco.exchangeRate.base.Model;

import java.io.Serializable;

public interface IModel extends Serializable {

	@Override
	boolean equals(Object obj);
	
	@Override
	String toString();
	
}