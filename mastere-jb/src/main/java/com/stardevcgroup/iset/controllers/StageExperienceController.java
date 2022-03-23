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
import com.stardevcgroup.iset.models.StageExperience;
import com.stardevcgroup.iset.repositories.EtudiantRepository;
import com.stardevcgroup.iset.repositories.StageExperienceRepository;



@CrossOrigin("*")
@RestController
public class StageExperienceController {
	@Autowired
	 private StageExperienceRepository stageExperienceRepository;
	
	@Autowired
	 private EtudiantRepository etudiantRepository;

	    //Récupérer la liste 
	    @RequestMapping(value = "/stage-experiences", method = RequestMethod.GET)
	    public List<StageExperience> listeStageExperiences() {
	       List<StageExperience> stageExperiences = stageExperienceRepository.findAll();	       
	       return  stageExperiences;
	    }
	    
	  //ajouter un 
	    @PostMapping( value = "/stage-experiences" )
	    public ResponseEntity<StageExperience> ajouterStageExperience(@RequestBody StageExperience stageExperience) {
	    	
	    	StageExperience stageExperience1 =  stageExperienceRepository.save(stageExperience);
	        if (stageExperience1 == null)
	            return ResponseEntity.noContent().build();

	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(stageExperience1.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(stageExperience1);
	    }
	    
	    //Récupérer un etudiant par son Id
	    @GetMapping(value = "/stage-experiences/{id}")
	    public ResponseEntity<StageExperience> afficherUnStageExperience(@PathVariable Long id) {
	    	StageExperience stageExperience =  stageExperienceRepository.getStageExperienceById(id);
	    	 if (stageExperience == null)
		          return ResponseEntity.noContent().build();


	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(stageExperience.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(stageExperience);
	    }
	    
	    
	    @DeleteMapping (value = "/stage-experiences/{id}/{idEt}")
	    public void supprimerStageExperience(@PathVariable Long id, @PathVariable Long idEt) {
	    	
	    	StageExperience stageExperience = stageExperienceRepository.getStageExperienceById(id);
	    	List<StageExperience> stageExperiences = new ArrayList<StageExperience>();
	    	
	    	Etudiant etudiant = etudiantRepository.getEtudiantById(idEt);
	    	
	    	stageExperiences = etudiant.getStageExperiences();
	    	stageExperiences.remove( stageExperience );
	    	
	    	etudiant.setStageExperiences(stageExperiences);
	    	etudiantRepository.save(etudiant);
	    	stageExperienceRepository.delete(stageExperience);
	    }
	    
	    @RequestMapping(value = "/stage-experiences/{id}", method = RequestMethod.PUT )
	    public ResponseEntity<StageExperience> updateStageExperience(@PathVariable Long id, @RequestBody StageExperience stageExperience) {
	    	StageExperience stageExperience1 =  stageExperienceRepository.getStageExperienceById(id);
	        if (stageExperience1 == null)
	            return ResponseEntity.noContent().build();
	        
	        if(stageExperience.getTitre() != null)
	        	stageExperience1.setTitre( stageExperience.getTitre() );
	        if(stageExperience.getEtudiant() != null)
	        	stageExperience1.setEtudiant(stageExperience.getEtudiant());
	        if(stageExperience.getDuree() != null)
	        	stageExperience1.setDuree(stageExperience.getDuree());;
	        if( stageExperience.getFile() != null )
	        	stageExperience1.setFile( stageExperience.getFile() );
	        if( stageExperience.getOrganisme() != null )
	        	stageExperience1.setOrganisme( stageExperience.getOrganisme() );
	        if( stageExperience.getRemarque() != null )
	        	stageExperience1.setRemarque( stageExperience.getRemarque() );
	        
	        
	        stageExperienceRepository.save(stageExperience);
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(stageExperience1.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(stageExperience1);
	    }

}