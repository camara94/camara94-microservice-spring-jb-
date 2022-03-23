package com.stardevcgroup.iset.controllers;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.stardevcgroup.iset.models.Bac;
import com.stardevcgroup.iset.models.Certificat;
import com.stardevcgroup.iset.models.Diplome;
import com.stardevcgroup.iset.models.Distinction;
import com.stardevcgroup.iset.models.Etudiant;
import com.stardevcgroup.iset.models.Formation;
import com.stardevcgroup.iset.models.Notification;
import com.stardevcgroup.iset.models.StageExperience;
import com.stardevcgroup.iset.repositories.BacRepository;
import com.stardevcgroup.iset.repositories.CertificatRepository;
import com.stardevcgroup.iset.repositories.DiplomeRepository;
import com.stardevcgroup.iset.repositories.DistinctionRepository;
import com.stardevcgroup.iset.repositories.EtudiantRepository;
import com.stardevcgroup.iset.repositories.FormationRepository;
import com.stardevcgroup.iset.repositories.NotificationRepository;
import com.stardevcgroup.iset.repositories.StageExperienceRepository;



@CrossOrigin("*")
@RestController
public class EtudiantController {
	 @Autowired
	 private EtudiantRepository etudiantRepository;
	 @Autowired
	 private DiplomeRepository diplomeRepository;
	
	 @Autowired
	 private BacRepository bacRepository;
	 @Autowired
	 private DistinctionRepository distinctionRepository;
	 @Autowired
	 private CertificatRepository certificatRepository;
	 @Autowired
	 private StageExperienceRepository stageExperienceRepository;
	 @Autowired
	 private NotificationRepository notificationRepository;
	

	    //Récupérer la liste des etudiants
	    @RequestMapping(value = "/etudiants", method = RequestMethod.GET)
	    public List<Etudiant> listeEtudiants() {
	       List<Etudiant> etudiants = etudiantRepository.findAll();
	       
	       return  etudiants;
	    }
	    
	  //ajouter un etudiant
	  // @RequestMapping( value = "/etudiants", method = RequestMethod.POST, headers = "Accept=application/json")
	    @RequestMapping(value = "/etudiants", method = RequestMethod.POST, consumes="application/json")
	    //@Transactional
	    //@PostMapping(value =  "/etudiants")
	    public ResponseEntity<Etudiant> ajouterEtudiant(@Valid @RequestBody Etudiant etudiant) {
	    	
	    	Etudiant etudiant1 =  etudiantRepository.save(etudiant);
	        if (etudiant1 == null)
	            return ResponseEntity.noContent().build();

	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(etudiant1.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(etudiant1);
	    }
	    
	    //Récupérer un etudiant par son Id
	    @GetMapping(value = "/etudiants/{id}")
	    public Etudiant afficherUnEtudiant(@PathVariable Long id) {
	    	Etudiant etudiant = etudiantRepository.getEtudiantById(id);
	    	 //ScoreDossierMastereInformatique sd = new ScoreDossierMastereInformatique( etudiant );
	    	 // System.out.println( "Moyenne : " + sd.getMoyenneAnneeUniversitaire() );
	        return etudiant;
	    }
	    
	    //Récupérer un etudiant par son Id
	    @GetMapping(value = "/etudiant/{username}")
	    public Etudiant getEtudiantByUsername(@RequestBody String username) {
	    	
	    	Etudiant etudiant = new Etudiant();
	    	
	    	List<Etudiant> etudiants = etudiantRepository.findAll();
	    	
	    	for(Etudiant etud: etudiants) {
	    		if( etud.getUsername() == username ) {
	    			etudiant = etud;
	    		}
	    	}
	    	this.updateNotifications( etudiant.getId() );
	        return etudiant;
	    }
	    
	    //Récupérer un etudiant par son Id
	    @GetMapping(value = "/users/{login}")
	    public Etudiant OneEtudiant(@PathVariable String login) {
	        Etudiant etudiant = etudiantRepository.findByUsername( login );
	        //boolean tester = false;
			//GestionDeNotification gestionDeNotification = new GestionDeNotification();	        
			//List<Notification> notifications = gestionDeNotification.setNotification(etudiant, this.notificationRepository.findAll());	    
			/*for (int i = 0; i < notifications.size(); i++) {
				if( etudiant.getNotifications().size() > 0 ) {
					for (int j = 0; j < etudiant.getNotifications().size(); j++) {
						if( !etudiant.getNotifications().get(j).getMessage().equals(notifications.get(i).getMessage()) ) {
							etudiant.setNotification(this.notificationRepository.save(notifications.get(i)));
							System.out.println(true);
							tester = true;
						}
					}
				} else {
					tester = false;
					etudiant.setNotification(this.notificationRepository.save(notifications.get(i)));
					System.out.println("lfdmffffffffffffffhrerfusqhhuqfeierfevbfdif" + true);
				}	
			}		        
	        if( tester) {
		 		etudiant = this.etudiantRepository.save(etudiant);
	        }  
	        
	        if (notifications != null) {
	        	etudiantRepository.save(etudiant);
	        }*/
	       
	        return etudiant;
	    }
	    
	    @DeleteMapping (value = "/etudiants/{id}")
	    public void supprimerEtudiant(@PathVariable Long id) {
	    	 etudiantRepository.getEtudiantById(id);
	    }
	    
	    @PatchMapping(value = "/etudiant-valider-dossier/{id}" )
	    public ResponseEntity<Etudiant> validerDossierEtudiant(@PathVariable Long id) {
	    	
	    	Etudiant etudiant1 =  etudiantRepository.getEtudiantById(id);
	    	
	    	/*if ( etudiant1.isValiderDossier() == true ) {
	    		etudiant1.setValiderDossier( false );
	    	} else {*/
	    		etudiant1.setValiderDossier( true );
	    	//}
	    	
	        if (etudiant1 == null)
	            return ResponseEntity.noContent().build();
	        
	       
	        etudiantRepository.save(etudiant1);
	      
	        
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(1)
	                .toUri();
	        return ResponseEntity.created(location).body(etudiant1);
	    }
	    
	    @PatchMapping(value = "/etudiant-annuler-dossier/{id}" )
	    public ResponseEntity<Etudiant> annulerDossierEtudiant(@PathVariable Long id) {
	    	
	    	Etudiant etudiant1 =  etudiantRepository.getEtudiantById(id);
	    	
	    	/*if ( etudiant1.isValiderDossier() == true ) {
	    		etudiant1.setValiderDossier( false );
	    	} else {*/
	    		etudiant1.setValiderDossier( false );
	    	//}
	    	
	        if (etudiant1 == null)
	            return ResponseEntity.noContent().build();
	        
	       
	        etudiantRepository.save(etudiant1);
	      
	        
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(1)
	                .toUri();
	        return ResponseEntity.created(location).body(etudiant1);
	    }
	    
	    @PutMapping(value = "/etudiant/{id}" )
	    public ResponseEntity<Etudiant> updateEtudiant(@PathVariable Long id, @RequestBody Etudiant etudiant) {
	    	System.out.println( etudiant );
	    	Etudiant etudiant1 =  etudiantRepository.getEtudiantById(id);
	        if (etudiant1 == null)
	            return ResponseEntity.noContent().build();
	        
	        etudiant1.setCin(etudiant.getCin());
	        etudiant1.setPrenom(etudiant.getPrenom()); 
	        etudiant1.setNom( etudiant.getNom() );
	        //etudiant1.setUSERNAME( etudiant.getUSERNAME() );
	        etudiant1.setEmail( etudiant.getEmail() );
	        etudiant1.setTelephone( etudiant.getTelephone() );
	       
	        etudiantRepository.save(etudiant1);
	      
	        
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(1)
	                .toUri();
	        return ResponseEntity.created(location).body(etudiant);
	    }
	    
	    
	    @PatchMapping( value = "/etudiant-diplome/{id}/{diplomeId}" )
	    public ResponseEntity<Diplome> ajouterDiplomeAEtudiant(@PathVariable Long id, @PathVariable Long diplomeId) {
	    	
	    	
	    	
	    	Etudiant etudiant = etudiantRepository.getEtudiantById(id);
	    	
	    	Diplome diplome = new Diplome();
	    	diplome.setId(diplomeId);
	    	
	    	//etudiant.setDiplome(diplome);
	    	
	        if (etudiant == null)
	            return ResponseEntity.noContent().build();
	        
	        
	        etudiantRepository.save(etudiant);
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(etudiant.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(diplome);
	    }
	    
	    @PatchMapping( value = "/etudiant-notification/{id}" )
	    public ResponseEntity<Notification> ajouterNotificationAEtudiant(@PathVariable Long id, @PathVariable Long notificationId) {
	    	
	    	
	    	Etudiant etudiant = etudiantRepository.getEtudiantById(id);
	    	
	    	//Certificat certificat = new Certificat();
	    	Notification notification = this.notificationRepository.getNotificationById(notificationId);
	    	
	    	etudiant.addNotification(notification);
	    	 
	        if (etudiant == null)
	            return ResponseEntity.noContent().build();       
	        //certificatRepository.save(certificat);
	        etudiantRepository.save(etudiant);
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(etudiant.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(notification);
	    } 
	    
	    @SuppressWarnings("unused")
		@PatchMapping( value = "/etudiant-bac/{id}/{bacId}" )
	    public ResponseEntity<Bac> ajouterBacAEtudiant(@PathVariable Long id, @PathVariable Long bacId) {
	    	
	    	
	    	
	    	Etudiant etudiant = etudiantRepository.getEtudiantById(id);
	    	
	    	Bac bac = bacRepository.getBacById(bacId);
	    	
	    	etudiant.setBac(bac);
	    	
	        if (etudiant == null)
	            return ResponseEntity.noContent().build();       
	        
	        etudiantRepository.save(etudiant);
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(bac.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(bac);
	    }
	    
	    
	    
	  
		@PatchMapping( value = "/etudiant-certificat/{id}/{certificatId}" )
	    public ResponseEntity<Certificat> ajouterCertificatAUnEtudiant(@PathVariable Long id, @PathVariable Long certificatId) {
	    	
	    	
	    	
	    	Etudiant etudiant = etudiantRepository.getEtudiantById(id);
	    	
	    	//Certificat certificat = new Certificat();
	    	Certificat certificat = certificatRepository.getCertificatById(certificatId);
	    	
	    	etudiant.addCertificat(certificat);
	    	 
	        if (etudiant == null)
	            return ResponseEntity.noContent().build();       
	        //certificatRepository.save(certificat);
	        etudiantRepository.save(etudiant);
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(etudiant.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(certificat);
	    } 
		
		@PatchMapping( value = "/etudiant-stage-experience/{id}/{stageExperienceId}" )
	    public ResponseEntity<StageExperience> ajouterStageExperienceAUnEtudiant(@PathVariable Long id, @PathVariable Long stageExperienceId) {
	    	
	    	Etudiant etudiant = etudiantRepository.getEtudiantById(id);
	    	
	    	//Certificat certificat = new Certificat();
	    	StageExperience stageExperience = stageExperienceRepository.getStageExperienceById(stageExperienceId);
	    	
	    	etudiant.addStageExperiences(stageExperience);
	    	 
	        if (stageExperience == null)
	            return ResponseEntity.noContent().build();
	        
	        stageExperienceRepository.save(stageExperience);
	        etudiantRepository.save(etudiant);
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(etudiant.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(stageExperience);
	    } 
	    
	    
	    @SuppressWarnings("unused")
		@PatchMapping( value = "/etudiant-distinctions/{id}/{distinctionId}" )
	    public ResponseEntity<Distinction> ajouterDistinctionIdcAUnEtudiant(@PathVariable Long id, @PathVariable Long distinctionId) {
	    	
	    	
	    	
	    	Etudiant etudiant = etudiantRepository.getEtudiantById(id);
	    	
	    	Distinction distinction = new Distinction();
	    	distinction = distinctionRepository.getDistinctionById(distinctionId);
	    	
	    	List<Distinction> distinctions =  etudiant.getDistinctions();
	    	distinctions.add(distinction);
	    	
	    	etudiant.setDistinctions(distinctions);
	    	 
	        if (etudiant == null)
	            return ResponseEntity.noContent().build();       
	        
	        etudiantRepository.save(etudiant);
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(etudiant.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(distinction);
	    }
	    
	    
	    @PatchMapping( value = "/supprimer-diplome/{id}/{diplomeId}" )
	    public ResponseEntity<Diplome> supprimerDiplomeAEtudiant(@PathVariable Long id, @PathVariable Long diplomeId) {
	    	
	    	
	    	
	    	Etudiant etudiant = etudiantRepository.getEtudiantById(id);
	    	
	    	Diplome diplome = new Diplome();
	    	diplome.setId(diplomeId);
	    	
	    	diplomeRepository.delete(diplome);
	    	
	        if (etudiant == null)
	            return ResponseEntity.noContent().build();
	        
	        
	        etudiantRepository.save(etudiant);
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(etudiant.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(diplome);
	    }
	    
	    
	    
	    

	    @PatchMapping( value = "/etudiant-formation/{id}/{formationId}" )
	    public ResponseEntity<Formation> ajouterFormationsAUnAEtudiant(@PathVariable Long id, @PathVariable Long formationId) {
	    	
	    	
	    	Etudiant etudiant = etudiantRepository.getEtudiantById(id);
	    	Formation formation = new Formation();
	    	formation.setId(formationId);
	    	
	    	etudiant.setFormation(formation);
	    	
	        if (etudiant == null)
	            return ResponseEntity.noContent().build();
	       	        
	        etudiantRepository.save(etudiant);
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(etudiant.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(formation);
	    }
	    
	    
	    
	    
	  ///+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	    
	  /*  OU
	    @PatchMapping( value = "/etudiants/{id}/releve/{releveId}" )
	    public ResponseEntity<AnneeUniversitaire> ajouterRelevesAUnAEtudiant(@PathVariable Long id, @PathVariable Long releveId, @RequestBody Etudiant etudiant) {
	    	
	    	Etudiant etudiant1 = etudiantRepository.getEtudiantById(etudiant.getId());
	    	AnneeUniversitaire anneeUniversitaire = new AnneeUniversitaire();
	    	anneeUniversitaire.setId(releveId);	
	    	etudiant.setAnneeUniversitaire(anneeUniversitaire);
	    	
	        if (etudiant1 == null)
	            return ResponseEntity.noContent().build();
	        
	        
	        etudiantRepository.save(etudiant1);
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(etudiant1.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(anneeUniversitaire);
	    }
	    
	    

	    @PatchMapping( value = "/etudiants/{id}/formations/{formationId}" )
	    public ResponseEntity<Formation> ajouterFormationsAUnAEtudiant(@PathVariable Long id, @PathVariable Long formationId, @RequestBody Etudiant etudiant) {
	    	
	    	Etudiant etudiant1 = etudiantRepository.getEtudiantById(etudiant.getId());
	    	Formation formation = new Formation();
	    	formation.setId(formationId);	
	    	etudiant.setFormation(formation);
	    	
	        if (etudiant1 == null)
	            return ResponseEntity.noContent().build();
	        
	        
	        etudiantRepository.save(etudiant1);
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(etudiant1.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(formation);
	    }*/
	    
	    
	
	    /*@PatchMapping( value = "/etudiants/{id}/diplomes/{diplomeId}" )
	    public ResponseEntity<Diplome> ajouterUnDiplomeAUnEtudiant(@PathVariable Long id, @PathVariable Long diplomeId, @RequestBody Etudiant etudiant) {
	    	
	    	Etudiant etudiant1 = etudiantRepository.getEtudiantById(etudiant.getId());
	    	Diplome diplome = new Diplome();
	    	diplome.setId(diplomeId);
	    	etudiant.setDiplome(diplome);
	    	
	        if (etudiant1 == null)
	            return ResponseEntity.noContent().build();
	        
	        
	        etudiantRepository.save(etudiant1);
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(etudiant1.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(diplome);
	    }*/
	    
	    
	    @PatchMapping( value = "/etudiants/{id}/{diplomeId}/{idEtablissement}" )
	    public ResponseEntity<Diplome> ajouterUnDiplomeAUnEtudiant(@PathVariable Long id, @PathVariable Long diplomeId, @PathVariable Long idEtablissement) {
	    	
	    	Etudiant etudiant1 = etudiantRepository.getEtudiantById(id);
	    	
	    	
	    	Diplome diplome = new Diplome();
	    	diplome.setId(diplomeId);
	    	etudiant1.setDiplome(diplome);
	    	
	        if (etudiant1 == null)
	            return ResponseEntity.noContent().build();      
	        
	        etudiantRepository.save(etudiant1);
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(etudiant1.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(diplome);
	    }
	    
	    
	    
	 public void updateNotifications( Long id ) {
	    Etudiant etudiant  =  this.etudiantRepository.getEtudiantById(id);
     
        
        for (int i = 0; i < etudiant.getNotifications().size(); i++) {
        	
        	if ( etudiant.getCin() != null 
        			&& etudiant.getNotifications().get(i).getMessage().indexOf("Le CIN est requis") >= 0 ) {
        	    Notification notif = etudiant.getNotifications().get(i);
        	    notif.setEtat(false);
        		notificationRepository.save(notif);
        	}
        	
        	if ( etudiant.getTelephone() != null 
        			&& etudiant.getNotifications().get(i).getMessage().indexOf("Le num. Tel est requis") >= 0 ) {
        	    Notification notif = etudiant.getNotifications().get(i);
        	    notif.setEtat(false);
        		notificationRepository.save(notif);
        	}
        	
        	if ( etudiant.getBac() != null 
        			&& etudiant.getNotifications().get(i).getMessage().indexOf("Le BAC est requis") >= 0 ) {
        	    Notification notif = etudiant.getNotifications().get(i);
        	    notif.setEtat(false);
        		notificationRepository.save(notif);
        	}
        	
        	if ( etudiant.getDiplomes().isEmpty() 
        				&& etudiant.getNotifications().get(i).getMessage().indexOf("Le Diplôme est requis") >= 0 ) {
	        	    Notification notif = etudiant.getNotifications().get(i);
	        	    notif.setEtat(false);
	        		notificationRepository.save(notif);
    			
    		} 
        	
		}
       
    }


	    
	    	    
}
