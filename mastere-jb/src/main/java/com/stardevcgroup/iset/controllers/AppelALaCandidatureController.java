package com.stardevcgroup.iset.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.stardevcgroup.iset.models.AppelALaCandidature;
import com.stardevcgroup.iset.repositories.AppelALaCandidatureRepository;



@CrossOrigin("*")
@RestController
public class AppelALaCandidatureController {
	
	@Autowired
	private AppelALaCandidatureRepository appelALaCandidatureRepository;
	
	//Récupérer la liste des mastere
    @RequestMapping(value = "/appel-a-la-candidatures", method = RequestMethod.GET)
    public List<AppelALaCandidature> listeAppelALaCandidatures() {
       List<AppelALaCandidature> appelALaCandidatures = appelALaCandidatureRepository.findAll();     
       return  appelALaCandidatures;
    }
    
  //ajouter un etudiant
    @PostMapping( value = "/appel-a-la-candidatures" )
    public ResponseEntity<AppelALaCandidature> ajouterAppelALaCandidature(@RequestBody AppelALaCandidature appelALaCandidature) {
    	AppelALaCandidature appelALaCandidature1 = null;
    	List<AppelALaCandidature> appelALaCandidatures = appelALaCandidatureRepository.findAll();
    	
    	///System.out.println(" Retour: " +  this.verifierAppelALaCandidature( appelALaCandidatures, appelALaCandidature ) );
    	
    	// Ici on verifie, si la candidature existe dans dans base de donnée on ne l'enregistre pas
    	if (this.verifierAppelALaCandidature( appelALaCandidatures, appelALaCandidature ) == false ) {
    		appelALaCandidature1 =  appelALaCandidatureRepository.save(appelALaCandidature);	
    	}
    	
    	if (appelALaCandidature1 == null)
            return ResponseEntity.noContent().build();

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(appelALaCandidature1.getId())
                .toUri();
        
        return ResponseEntity.created(location).body(appelALaCandidature1);
    }
    
    //Récupérer un etudiant par son Id
    @GetMapping(value = "/appel-a-la-candidatures/{id}")
    public AppelALaCandidature afficherUnAppelALaCandidature(@PathVariable Long id) {
        return appelALaCandidatureRepository.getAppelALaCandidatureById(id);
    }   
    
   
    @RequestMapping(value = "/appel-a-la-candidatures/{id}", method = RequestMethod.PUT )
    public ResponseEntity<Void> updateAppelALaCandidature(@PathVariable Long id, @RequestBody AppelALaCandidature appelALaCandidature) {
    	AppelALaCandidature appelALaCandidature1 =  appelALaCandidatureRepository.getAppelALaCandidatureById(id);
        if (appelALaCandidature1 == null)
            return ResponseEntity.noContent().build();
        
        appelALaCandidature1.setAnneeUniversitaire(appelALaCandidature.getAnneeUniversitaire() );
        appelALaCandidature1.setDisponible( appelALaCandidature.getDisponible() );
        appelALaCandidature1.setEtablissementId( appelALaCandidature.getEtablissementId() );
        appelALaCandidature1.setMastereId( appelALaCandidature.getMastereId() );
        
        appelALaCandidatureRepository.save(appelALaCandidature1);
        
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(appelALaCandidature1.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }
    
    public boolean verifierAppelALaCandidature( List<AppelALaCandidature> appelALaCandidatures,  AppelALaCandidature appelALaCandidature ) {
		boolean appelALaCandidatureExiste = false;
		
		 for( AppelALaCandidature appel: appelALaCandidatures ) {
			 
			  if ( 
					     appel.getAnneeUniversitaire().equals(appelALaCandidature.getAnneeUniversitaire())
					  && appel.getEtablissementId() == appelALaCandidature.getEtablissementId()
					  && appel.getMastereId() == appelALaCandidature.getMastereId()
			     ) { 
				  
				 /* System.out.println( 
						  appel.getAnneeUniversitaire().equals(appelALaCandidature.getAnneeUniversitaire())
						  && appel.getEtablissementId() == appelALaCandidature.getEtablissementId()
						  && appel.getMastereId() == appelALaCandidature.getMastereId()
						  );*/
				  appelALaCandidatureExiste = true;
				  break;
			  }
			  
			  //System.out.println( appel.getEtablissementId() + " == " + appelALaCandidature.getEtablissementId() );
		 }
		
    	return appelALaCandidatureExiste;	
    }

}
