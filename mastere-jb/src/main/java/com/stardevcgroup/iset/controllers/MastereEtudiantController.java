package com.stardevcgroup.iset.controllers;

import java.net.URI;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.stardevcgroup.iset.business.DoublonAnnee;
import com.stardevcgroup.iset.business.ScoreDossierMastereInformatique;
import com.stardevcgroup.iset.models.MastereEtudiant;
import com.stardevcgroup.iset.models.MastereEtudiantId;
import com.stardevcgroup.iset.models.Reponse;
import com.stardevcgroup.iset.repositories.EtudiantRepository;
import com.stardevcgroup.iset.repositories.MastereEtudiantRepository;
import com.stardevcgroup.iset.repositories.MastereRepository;



@CrossOrigin("*")
@RestController
public class MastereEtudiantController {
	
	@Autowired
	 private MastereEtudiantRepository mastereEtudiantRepository;
	
	@Autowired
	private EtudiantRepository etudiantRepository;
	@Autowired
	private MastereRepository mastereRepository;
	
	 //Récupérer la liste des etudiants
    @RequestMapping(value = "/mastere-etudiants", method = RequestMethod.GET)
    public ResponseEntity<List<MastereEtudiant>> listeMastereEtudiants() {
       List<MastereEtudiant> mastereEtudiants = mastereEtudiantRepository.findAll();      
       for(int i=0; i < mastereEtudiants.size(); i++ ) {
    	   ScoreDossierMastereInformatique sc = new ScoreDossierMastereInformatique( 
    			   																	this.etudiantRepository.getEtudiantById(
    			   																			mastereEtudiants.get(i).getId().getEtudiantId()
    			   																			),
    			   																	this.mastereRepository.getMastereById( 
    			   																			mastereEtudiants.get(i).getId().getMastereId()	
    			   																		)
    			   																	);
    	   mastereEtudiants.get(i).setScore( 
						    			   sc.getMoyenneAnneeUniversitaire()
						    			   +sc.getBonificationParcours()
										   +sc.getMoyenneBaccalaureat()
    			   						);
       } 
       
       URI location = ServletUriComponentsBuilder.fromCurrentRequest()
									             .path("/{id}")
									             .buildAndExpand(1)
									             .toUri();
       
       return ResponseEntity.created(location).body(mastereEtudiants);
    }
    
    
    
  //Récupérer la liste des etudiants
    @RequestMapping(value = "/mastere-etudiant/{mastereId}/{etudiantId}", method = RequestMethod.GET)
    public ResponseEntity<MastereEtudiant> mastereEtudiant( @PathVariable Long etudiantId, @PathVariable Long mastereId ) {
       MastereEtudiantId id = new MastereEtudiantId(mastereId, etudiantId);
       MastereEtudiant mastereEtudiant = mastereEtudiantRepository.getMastereEtudiantById(id);
       
      
    	   ScoreDossierMastereInformatique sc = new ScoreDossierMastereInformatique( 
    			   																	this.etudiantRepository.getEtudiantById(
    			   																			mastereEtudiant.getId().getEtudiantId()
    			   																			),
    			   																	this.mastereRepository.getMastereById( 
    			   																			mastereEtudiant.getId().getMastereId()	
    			   																		)
    			   																	);
    	   mastereEtudiant.setScore( 
					    			   sc.getMoyenneAnneeUniversitaire()
					    			   +sc.getBonificationParcours()
									   +sc.getMoyenneBaccalaureat()
					    			);
       
       
       URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                                   				 .path("/{id}")
									             .buildAndExpand(1)
									             .toUri();
       
       return ResponseEntity.created(location).body(mastereEtudiant);
    }
    
    
    
    
    
    //Récupérer la liste des etudiants
    @RequestMapping(value = "/mastere-etudiants/{anneeUniversitaire}", method = RequestMethod.GET)
    public ResponseEntity<List<MastereEtudiant>> listeMastereEtudiantByAnneeUniversitaire( @PathVariable String anneeUniversitaire ) {
       List<MastereEtudiant> mastereEtudiants = mastereEtudiantRepository.getMastereEtudiantByAnneeUniversitaire(anneeUniversitaire);
       URI location = ServletUriComponentsBuilder.fromCurrentRequest()
								                 .path("/{id}")
								                 .buildAndExpand(1)
								                 .toUri();
       
       return ResponseEntity.created(location).body(mastereEtudiants);
    }
    
  //Récupérer la liste des etudiants
   @RequestMapping(value = "/annees", method = RequestMethod.GET)
    public ResponseEntity<List<String>> chercheAnnee() {
       List<MastereEtudiant> mastereEtudiants = mastereEtudiantRepository.findAll();
       DoublonAnnee  doublonAnnee = new DoublonAnnee(mastereEtudiants);
       List<String> annnees = doublonAnnee.anneeUnique();
       URI location = ServletUriComponentsBuilder.fromCurrentRequest()
									             .path("/{id}")
									             .buildAndExpand(1)
									             .toUri();
       
       return ResponseEntity.created(location).body(annnees);
    }
    
  
 //ajouter un 
   @PostMapping( value = "/mastere-etudiants/{mastere_id}/{etudiant_id}" )
    //@RequestMapping(value = "/mastere-etudiants/{mastere_id}/{etudiant_id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<Reponse> ajouterMastereEtudiants( @PathVariable Long mastere_id, @PathVariable Long etudiant_id, @RequestBody String annee ) {
	   Reponse message = new Reponse();
	   boolean estDejaInscris = false;
	   String nomMastere = "";
    	MastereEtudiant mastereEtudiant2 
    			= new MastereEtudiant( 
    			  mastereRepository.getMastereById(mastere_id),
    			  etudiantRepository.getEtudiantById(etudiant_id)
    		    );
    	mastereEtudiant2.setAnneeAniversitaire(annee);
    	
    	List<MastereEtudiant> mastereEtudiants = this.mastereEtudiantRepository.findAll();
    	
    	
    	
    	for( MastereEtudiant me: mastereEtudiants ) {
    		
    		if( 
    				me.getId().getEtudiantId().equals(mastereEtudiant2.getId().getEtudiantId()) 
    			 && me.getId().getMastereId() == mastereEtudiant2.getId().getMastereId()
    			 && me.getAnneeUniversitaire().equals(mastereEtudiant2.getAnneeUniversitaire())
    		   ) {
    			estDejaInscris = true;
    			nomMastere = mastereRepository.getMastereById(me.getId().getMastereId()).getLibele();
    			break;
    		}
    	}
    	MastereEtudiant mastereEtudiant1 = new MastereEtudiant( 
  			  mastereRepository.getMastereById(mastere_id),
  			  etudiantRepository.getEtudiantById(etudiant_id)
  		    );
    	
    	if ( estDejaInscris == true) {
    		message.setTitre(nomMastere);
    		message.setReponse("Vous êtes déjà  inscris au mastère ");
    	} else {
    		mastereEtudiant1 =  mastereEtudiantRepository.save(mastereEtudiant2);
    		message.setTitre(mastereRepository.getMastereById(mastereEtudiant1.getId().getMastereId()).getLibele());
    		message.setReponse("Félicitation, vous venez de vous inscrire à un de nos mastères");
    	}
    	
    	System.out.println( "Boolean: " + estDejaInscris );
    	
    			
	        if (mastereEtudiant1 == null)
	            return ResponseEntity.noContent().build();

	        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
										              .path("/{mastere_id}")
										              .buildAndExpand(mastereEtudiant1.getId())
										              .toUri();
	        
	    /*return ResponseEntity.status(HttpStatus.OK)
	                			 .body(message);*/
	    return  ResponseEntity.created(location).body(message);
    }
   
   
    
   @GetMapping(value = "/mastere-etudiants/{mastereId}/{anneeUniversitaire}")
    public List<MastereEtudiant> afficherMastereEtudiantByMastereIdAndAnneeUniversitaire(@PathVariable Long mastereId, @PathVariable String anneeUniversitaire) {
	   List<MastereEtudiant> mastereEtudiants = mastereEtudiantRepository.findAll();
	   List<MastereEtudiant>  mes = mastereEtudiantRepository.getMastereEtudiantByMastereIdAndAnneeUniversitaire(mastereId, anneeUniversitaire);
	   List<MastereEtudiant> mastereEtudiantUnique = new ArrayList<MastereEtudiant>();
	   
	   for( MastereEtudiant m:  mes) {
		   if ( !mes.contains( m.getId().getMastereId()) && !mes.contains( m.getAnneeUniversitaire()) ) {
			   mastereEtudiantUnique.add(m);
		   }
	   }
	   
	   
	   for(int i=0; i < mastereEtudiantUnique.size(); i++ ) {
    	   ScoreDossierMastereInformatique sc = new ScoreDossierMastereInformatique( 
    			   																	this.etudiantRepository.getEtudiantById(
    			   																			mastereEtudiants.get(i).getId().getEtudiantId()
    			   																			),
    			   																	this.mastereRepository.getMastereById( 
    			   																			mastereEtudiants.get(i).getId().getMastereId()	
    			   																		)
    			   																	);
    	   mastereEtudiantUnique.get(i).setScore( 
								    			   sc.getMoyenneAnneeUniversitaire()
								    			   +sc.getBonificationParcours()
												   +sc.getMoyenneBaccalaureat()
								    			 );
	   
	   }
	   
	   return mastereEtudiantUnique;
   }
    
    
}
