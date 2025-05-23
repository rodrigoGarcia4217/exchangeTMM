package com.arinco.exchangeRate.base.service.core;

import com.arinco.exchangeRate.base.dto.MailDto;

public interface IMailSenderService {

	/**
	 * @param mailDto
	 */
	void send(MailDto mailDto);
}
