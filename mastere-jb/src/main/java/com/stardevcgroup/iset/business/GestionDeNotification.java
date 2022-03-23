package com.stardevcgroup.iset.business;

import java.util.ArrayList;
import java.util.List;

import com.stardevcgroup.iset.models.Etudiant;
import com.stardevcgroup.iset.models.Notification;


public class GestionDeNotification {
	
	public List<Notification> setNotification(Etudiant etudiant, List<Notification> notificationss) {	
		List<Notification> notifications = new ArrayList<Notification>();
		if ( etudiant.getCin().equals(null)) {
			Notification notif = new Notification(null, "Le CIN est requis", true, etudiant);
			if (enregistrerNotification(etudiant, notif) != null)
				notifications.add(enregistrerNotification(etudiant, notif));
		}
		
		if ( etudiant.getEmail().equals(null)) {
			Notification notif = new Notification(null, "L'email est requis", true, etudiant);
			if (enregistrerNotification(etudiant, notif) != null)
				notifications.add(enregistrerNotification(etudiant, notif));
		}
		
		if ( etudiant.getTelephone().equals(null)) {
			Notification notif = new Notification(null, "Le num. Tel est requis", true, etudiant);
			if (enregistrerNotification(etudiant, notif) != null)
				notifications.add(enregistrerNotification(etudiant, notif));
		} 
		
		
		if ( etudiant.getBac() == null ) {
			Notification notif = new Notification(null, "Le BAC est requis", true, etudiant);
			if (enregistrerNotification(etudiant, notif) != null)
				notifications.add(enregistrerNotification(etudiant, notif));
		}
		
		if ( etudiant.getDiplomes().isEmpty() ) {
			Notification notif = new Notification(null, "Le Diplôme est requis", true, etudiant);
			if (enregistrerNotification(etudiant, notif) != null)
				notifications.add(enregistrerNotification(etudiant, notif));
			
		} 
		
		
		return notifications;
	}
	
	public Notification enregistrerNotification(Etudiant etudiant, Notification notification) {
		Notification notif = null;
		boolean notificationExiste = false;
		if( etudiant.getNotifications().size() > 0 ) {
			for (int i = 0; i < etudiant.getNotifications().size(); i++) {
				if ( etudiant.getNotifications().get(i).getMessage().indexOf(notification.getMessage()) >= 0 ) {
					//notif.setId(etudiant.getNotifications().get(i).getId());	
					notificationExiste = true;
					
				} 
			}
		} else {
			notif =  notification;
		}
		
		notif = (notificationExiste)? null : notification;
		return notif;
	}
	
	public Notification updateNotification(Etudiant etudiant, Notification notification) {
		Notification notif = null;
		boolean notificationExiste = false;
		if( etudiant.getNotifications().size() > 0 ) {
			for (int i = 0; i < etudiant.getNotifications().size(); i++) {
				if ( etudiant.getNotifications().get(i).getMessage().indexOf(notification.getMessage()) >= 0 ) {
					//notif.setId(etudiant.getNotifications().get(i).getId());	
					notificationExiste = true;
					
				} 
			}
		} else {
			notif =  notification;
		}
		
		notif = (notificationExiste)? null : notification;
		return notif;
	}
}
