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

import com.stardevcgroup.iset.models.ChampFormule;
import com.stardevcgroup.iset.models.Etudiant;
import com.stardevcgroup.iset.models.Mastere;
import com.stardevcgroup.iset.models.MastereEtudiant;
import com.stardevcgroup.iset.repositories.ChampFormuleRepository;
import com.stardevcgroup.iset.repositories.EtudiantRepository;
import com.stardevcgroup.iset.repositories.MastereEtudiantRepository;
import com.stardevcgroup.iset.repositories.MastereRepository;



@CrossOrigin("*")
@RestController
public class ChampFormuleController {
	@Autowired
	 private ChampFormuleRepository champFormuleRepository;
	
	@Autowired
	 private MastereRepository mastereRepository;
	
	@Autowired
	 private MastereEtudiantRepository mastereEtudiantRepository;
	
	@Autowired
	private EtudiantRepository etudiantRepository;
	

	    //Récupérer la liste 
	    @RequestMapping(value = "/formules", method = RequestMethod.GET)
	    public List<ChampFormule> listeChampFormules() {
	       List<ChampFormule> champFormules = champFormuleRepository.findAll();	       
	       return  champFormules;
	    }
	    
	  //ajouter un 
	    @PostMapping( value = "/formules/{mastereId}/{etudiantId}" )
	    public ResponseEntity<ChampFormule> ajouterChampFormule( 
	    		@PathVariable Long mastereId, 
	    		@PathVariable Long etudiantId,
	    		@RequestBody ChampFormule champFormule
	    	) {
	    	
	    	
	    	Etudiant etudiant = this.etudiantRepository.getEtudiantById(etudiantId);
	    	Mastere mastere = this.mastereRepository.getMastereById(mastereId);
	    	
	    	MastereEtudiant id = new MastereEtudiant();
	    	id.setEtudiant(etudiant);
	    	id.setMastere(mastere);
	    	
	    	ChampFormule champFormule1 =  champFormuleRepository.save(champFormule);
	        if (champFormule1 == null)
	            return ResponseEntity.noContent().build();

	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(champFormule1.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(champFormule1);
	    }
	    
	    //Récupérer un etudiant par son Id
	    @GetMapping(value = "/formules/{id}")
	    public ResponseEntity<ChampFormule> afficherUnChampFormule(@PathVariable Long id) {
	    	ChampFormule champFormule =  champFormuleRepository.getChampFormuleById(id);
	    	 if (champFormule == null)
		          return ResponseEntity.noContent().build();


	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(champFormule.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(champFormule);
	    }
	    
	    
	    @DeleteMapping (value = "/formules/{id}/{idMast}")
	    public void supprimerChampFormule(@PathVariable Long id, @PathVariable Long idMast) {
	    	
	    	ChampFormule champFormule = champFormuleRepository.getChampFormuleById(id);
	    	List<ChampFormule> champFormules = new ArrayList<ChampFormule>();
	    	
	    	Mastere mastere = mastereRepository.getMastereById(idMast);
	    	
	    	mastereRepository.save(mastere);
	    	champFormuleRepository.delete(champFormule);
	    }
	    
	    @RequestMapping(value = "/formules/{id}", method = RequestMethod.PUT )
	    public ResponseEntity<ChampFormule> updateChampFormule(@PathVariable Long id, @RequestBody ChampFormule champFormule) {
	    	ChampFormule champFormule1 =  champFormuleRepository.getChampFormuleById(id);
	        if (champFormule1 == null)
	            return ResponseEntity.noContent().build();
	        
	        
	        if(champFormule.getMentionBac() > -1)
	        	champFormule1.setMentionBac( champFormule.getMentionBac() );
	        if(champFormule.getCoefficientDistinction() > -1)
	        	champFormule1.setCoefficientDistinction( champFormule.getCoefficientDistinction() );
	        if(champFormule.getCoefficientAnneeUniversitaire() > -1)
	        	champFormule1.setCoefficientAnneeUniversitaire( champFormule.getCoefficientAnneeUniversitaire() );
	        if(champFormule.getCoefficientBac() > -1)
	        	champFormule1.setCoefficientBac( champFormule.getCoefficientBac() );
	        if(champFormule.getCoefficientCertificat() > -1 )
	        	champFormule1.setCoefficientCertificat( champFormule.getCoefficientCertificat() );
	        if(champFormule.getCoefficientAnneeSupplementaire() > -1 )
	        	champFormule1.setCoefficientAnneeSupplementaire( champFormule.getCoefficientAnneeSupplementaire() );
	        if(champFormule.getCoefficientExperience() > -1 )
	        	champFormule1.setCoefficientExperience( champFormule.getCoefficientExperience() );
	        if(champFormule.getCoefficientFormation() > -1 )
	        	champFormule1.setCoefficientFormation( champFormule.getCoefficientFormation() );
	        if(champFormule.getCoefficientMentionABien() > -1 )
	        	champFormule1.setCoefficientMentionABien( champFormule.getCoefficientMentionABien() );
	        if(champFormule.getCoefficientMentionBien() > -1 )
	        	champFormule1.setCoefficientMentionBien( champFormule.getCoefficientMentionBien() );
	        if(champFormule.getCoefficientMentionTBien() > -1 )
	        	champFormule1.setCoefficientMentionTBien( champFormule.getCoefficientMentionTBien() );
	        if(champFormule.getCoefficientRedouble() > -1 )
	        	champFormule1.setCoefficientRedouble( champFormule.getCoefficientRedouble() );
	        if(champFormule.getCoefficientSessionPrincipale() > -1 )
	        	champFormule1.setCoefficientSessionPrincipale( champFormule.getCoefficientSessionPrincipale() );
	        if(champFormule.getCoefficientStage() > -1 )
	        	champFormule1.setCoefficientStage( champFormule.getCoefficientStage() );
	        if(champFormule.getCoefficientAnneeUniversitaire() > -1 )
	        	champFormule1.setCoefficientAnneeUniversitaire( champFormule.getCoefficientAnneeUniversitaire() );
	        if(champFormule.getNombreLimiteDeCertificat() > -1 )
	        	champFormule1.setNombreLimiteDeCertificat( champFormule.getNombreLimiteDeCertificat() );
	        if(champFormule.getNombreLimiteDeFormation() > -1 )
	        	champFormule1.setNombreLimiteDeFormation( champFormule.getNombreLimiteDeFormation() );
	        if(champFormule.getNombreLimiteDeStage() > -1 )
	        	champFormule1.setNombreLimiteDeStage( champFormule.getNombreLimiteDeStage() );
	        if(champFormule.getNombreLimiteDExperience() > -1 )
	        	champFormule1.setNombreLimiteDExperience( champFormule.getNombreLimiteDExperience() );
	        if(champFormule.getNombreDeRedoublementMax() > -1 )
	        	champFormule1.setNombreDeRedoublementMax( champFormule.getNombreDeRedoublementMax() );
	        
	        
	        
	        
	        
	        champFormuleRepository.save(champFormule1);
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(champFormule1.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(champFormule1);
	    }

}
