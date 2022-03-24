package tn.rmu.isetjb.mastere.email.controller;

import java.util.Iterator;
import java.util.Properties;
import java.util.Set;

import org.apache.logging.log4j.Logger;

/*
 * @Author CAMARA Laby Damaro
 */


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import lombok.extern.slf4j.Slf4j;
import tn.rmu.isetjb.mastere.email.models.EmailTemplate;
import tn.rmu.isetjb.mastere.email.service.EmailService;

@CrossOrigin("*")
@RestController
@RequestMapping("/notification")
@Slf4j
public class TextEmailController {
	
	//Logger log;
	
	@Autowired
	private EmailService emailService;
	
	@GetMapping(value = "/welcome")
	public String  welcome() {
		return "Bienvenue à l'ISET Djerba";
	}
	
	
	@PostMapping(value="/textemail")//,consumes = "application/json", produces = "application/json")
	public String sendEmail(@RequestBody EmailTemplate emailTemplate) {
		try {
			//log.info("Envoyer un Simple Text par Email....");
			emailService.sendTextEmail(emailTemplate);
			return "L'email envoyé avec succès!";
		} catch (Exception ex) {
			return "Erreur d'envoie de mail: " + ex;
		}
	}
	
	
	@PostMapping(value="/attachemail",consumes = "multipart/form-data")
	public String sendEmailWithAttachment(@RequestPart(value = "file") MultipartFile file, @RequestPart(value = "mail") String mail) {
		try {
			//log.info("Envoyer un Fichier par Email....");
			emailService.sendEmailWithAttachment(file, mail);
			return "L'email envoyé avec succès!";
		} catch (Exception ex) {
			return "Erreur d'envoie de mail: " + ex;
		}
	}
	

}
