package com.arinco.exchangeRate.base.service;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.arinco.exchangeRate.base.dto.MailDto;
import com.arinco.exchangeRate.base.service.core.IMailSenderService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service("mailSenderService")
public class MailSenderService implements IMailSenderService{
	
	@Autowired
    private TemplateEngine templateEngine;

    @Autowired
    private JavaMailSender javaMailSender;
    
	@Override
    public void send(MailDto mail) {
        final Context context = new Context();
        context.setVariable("message", mail.getMessage());
        String body = templateEngine.process("mail", context);
        sendPreparedMail(mail.getEmail(), mail.getObject(), body, true);
    }
	
	private void sendPreparedMail(String to, String subject, String text, Boolean isHtml) {
        try {
        	MimeMessage mail = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mail, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, isHtml);
            helper.setFrom("aplicaciones@arinco.dev");
            javaMailSender.send(mail);
        } catch (Exception e) {
            log.error("Problem with sending email to: {}, error message: {}", to, e.getMessage());
        }
    } 

}

