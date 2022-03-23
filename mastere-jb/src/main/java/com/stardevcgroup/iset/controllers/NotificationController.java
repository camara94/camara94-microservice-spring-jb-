package com.stardevcgroup.iset.controllers;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.stardevcgroup.iset.models.Etudiant;
import com.stardevcgroup.iset.models.Notification;
import com.stardevcgroup.iset.repositories.EtudiantRepository;
import com.stardevcgroup.iset.repositories.NotificationRepository;



@CrossOrigin("*")
@RestController
public class NotificationController {
	@Autowired
	 private NotificationRepository notificationRepository;
	
	@Autowired
	 private EtudiantRepository etudiantRepository;

	    //Récupérer la liste 
	    @RequestMapping(value = "/notifications", method = RequestMethod.GET)
	    public List<Notification> listeNotifications() {
	       List<Notification> notifications = this.notificationRepository.findAll();	       
	       return  notifications;
	    }
	    
	    
	  //Récupérer la liste 
	    @GetMapping(value = "/notification/{id}")
	    public List<Notification> notificationByEtudiant(@PathVariable Long id) {
	       List<Notification> notifications = this.notificationRepository.findAll();
	       
	       List<Notification> notifs = new ArrayList<Notification>();
	       
	       for(Notification n: notifications) {
	    	   if( n.getEtudiant().getId() == id ) {
	    		   notifs.add(n);
	    	   }
	       }
	       
	       return  notifs;
	    }
	    
	    
	  //ajouter un 
	    @PostMapping( value = "/notifications/{id}" )
	    public ResponseEntity<Notification> ajouterNotification( @PathVariable Long id, @RequestBody String messageNotification) {
	    	
	    	Etudiant etudiant = this.etudiantRepository.getEtudiantById(id);
	    	
	    	Notification notification = new Notification();
	    	notification.setMessage(messageNotification);
	    	
	    	notification.setEtat(true);
	    	List<Notification> notifications = this.notificationRepository.findAll();
	    	
	    	Notification notification1 = null;
	    	
	    	int nombreDeNotification = 0;
	    	
	    	
	    	if (notifications.size() > 0) {
	    		
	    		for (Notification notif: notifications) {
		    		
		    		if (
		    				notif.getMessage().equals( messageNotification )	
		    		   ) { 
		    			  nombreDeNotification++;
		    			  break;
		    		} else {
		    			//notification1 = this.notificationRepository.save(notification);
		    			//System.out.println( "Combien ????==" );
		    		}
		    		
				}
	    	} else {
	    		
	    		
	    		etudiant.setNotification(notification1);
	    		etudiantRepository.save(etudiant);
	    	}
	    	
	    	if(nombreDeNotification>0) {
	    		System.out.println( "Combien ????--" );
	    	} else {
	    		notification1 = this.notificationRepository.save(notification);
	    		etudiant.setNotification(notification1);
	    		etudiantRepository.save(etudiant);
	    	}
	    	
	    	notification1 = this.notificationRepository.save(notification);
	        if (notification1 == null)
	            return ResponseEntity.noContent().build();

	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(notification1.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(notification1);
	    }
	    
	    //Récupérer un etudiant par son Id
	    @GetMapping(value = "/notifications/{id}")
	    public ResponseEntity<Notification> afficherUnCertificat(@PathVariable Long id) {
	    	Notification notification =  this.notificationRepository.getNotificationById(id);
	    	 if (notification == null)
		          return ResponseEntity.noContent().build();


	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(notification.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(notification);
	    }
	    
	    
	    @DeleteMapping (value = "/notifications/{id}/{idEt}")
	    public void supprimerNotification(@PathVariable Long id, @PathVariable Long idEt) {
	    	
	    	Notification notification = this.notificationRepository.getNotificationById(id);
	    	List<Notification> notifications = new ArrayList<Notification>();
	    	
	    	Etudiant etudiant = etudiantRepository.getEtudiantById(idEt);
	    	
	    	//etudiantRepository.save(etudiant);
	    	//diplomeRepository.delete( etudiant.getDiplome(id) );
	    	//diplomeRepository.deleteByDiplomesId(id);//.deleteById(id);
	    	//etudiantRepository.deleteById(diplome.getId());
	    	
	    	notifications = etudiant.getNotifications();
	    	notifications.remove( notification );
	    	
	    	etudiant.setNotifications(notifications);
	    	etudiantRepository.save(etudiant);
	    	this.notificationRepository.delete(notification);
	    }
	    
	    @RequestMapping(value = "/notifications/{id}", method = RequestMethod.PUT )
	    public ResponseEntity<List<Notification>> updateNotification(@PathVariable Long id) {
	    	Etudiant etudiant  =  this.etudiantRepository.getEtudiantById(id);
	    	List<Notification> notifications = notificationRepository.findAll();
	        if (etudiant.getNotifications() == null)
	            return ResponseEntity.noContent().build();
	        
	        if( notifications.size() > 0 ) {
	        	
	        	System.out.println( "id === " + etudiant.getNotifications() );
	        	/*for (int i = 0; i < etudiant.getNotifications().size(); i++) {
		        	
		        	if ( etudiant.getNotifications().get(i).getMessage().indexOf("Le CIN est requis") >= 0 ) {
		        	    Notification notif = etudiant.getNotifications().get(i);
		        	    notif.setId(etudiant.getNotifications().get(i).getId());
		        	    notif.setEtat(false);
		        		notificationRepository.save(notif);
		        	}
		        	
		        	if ( etudiant.getNotifications().get(i).getMessage().indexOf("Le num. Tel est requis") >= 0 ) {
		        	    Notification notif = etudiant.getNotifications().get(i);
		        	    notif.setId(etudiant.getNotifications().get(i).getId());
		        	    notif.setEtat(false);
		        		notificationRepository.save(notif);
		        	}
		        	
		        	if (  etudiant.getNotifications().get(i).getMessage().indexOf("Le BAC est requis") >= 0 ) {
		        	    Notification notif = etudiant.getNotifications().get(i);
		        	    notif.setId(etudiant.getNotifications().get(i).getId());
		        	    notif.setEtat(false);
		        		notificationRepository.save(notif);
		        	}
		        	
		        	if (  etudiant.getNotifications().get(i).getMessage().indexOf("Le Diplôme est requis") >= 0 ) {
			        	    Notification notif = etudiant.getNotifications().get(i);
			        	    notif.setId(etudiant.getNotifications().get(i).getId());
			        	    notif.setEtat(false);
			        		notificationRepository.save(notif);
		    		} 
		        	
				}
	        } else {
	        	if ( etudiant.getCIN() == null ) {
	        	    Notification notif = new Notification(null ,"Le CIN est requis", true, etudiant);
	        		notificationRepository.save(notif);
	        	}
	        	
	        	if ( etudiant.getTELEPHONE() == null ) {
	        		Notification notif = new Notification(null ,"Le num. Tel est requis", true, etudiant);
	        		notificationRepository.save(notif);
	        	}
	        	
	        	if ( etudiant.getBac() == null ) {
	        		Notification notif = new Notification(null ,"Le BAC est requis", true, etudiant);
	        		notificationRepository.save(notif);
	        	}
	        	
	        	if ( etudiant.getDiplomes().isEmpty() ) {
	        		Notification notif = new Notification(null ,"Le Diplôme est requis", true, etudiant);
	        		notificationRepository.save(notif);
	    			
	    		} */
	        }
	       
	        
	       URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(114)
	                .toUri();
	        return ResponseEntity.created(location).body(etudiant.getNotifications());
	    }

}
