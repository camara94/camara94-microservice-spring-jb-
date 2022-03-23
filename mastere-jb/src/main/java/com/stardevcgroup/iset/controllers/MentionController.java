package com.stardevcgroup.iset.controllers;


import java.net.URI;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.stardevcgroup.iset.models.Domaine;
import com.stardevcgroup.iset.models.Mention;
import com.stardevcgroup.iset.repositories.DomaineRepository;
import com.stardevcgroup.iset.repositories.MentionRepository;



@CrossOrigin("*")
@RestController

public class MentionController {
	
	@Autowired
	private MentionRepository mentionRepository;
	@Autowired
	private DomaineRepository domaineRepository;

	    //Récupérer la liste des etudiants
	    @RequestMapping(value = "/mentions", method = RequestMethod.GET)
	    public List<Mention> listeMentions() {
	       List<Mention> mentions = mentionRepository.findAll();
	       
	       return  mentions;
	    }
	    
	    @PatchMapping( value = "/mention-domaines/{id}/{domaineId}" )
	    public ResponseEntity<Mention> ajouterBacAUnEtudiant(@PathVariable Long id, @PathVariable Long domaineId, 
	    		@RequestBody Mention mention ) {
	    	
	    	
	    	Mention mention1 = mentionRepository.getMentionById(id);
	    	
	    	Domaine domaine = domaineRepository.getDomaineById(domaineId);
	    	
	    	mention1.setDomaine(domaine);
	    	mention1.setNom(mention.getNom());
	    	
	    	
	        if ( mention1 == null)
	            return ResponseEntity.noContent().build();
	        
	        
	        mentionRepository.save(mention1);
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(mention1.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(mention1);
	    }
	    
	    
	  //ajouter un etudiant
	    @PostMapping( value = "/mentions" )
	    @Transactional
	    public ResponseEntity<Mention> ajouterMention(@RequestBody Mention mention) {
	    	
	    	Mention mention1 =  mentionRepository.save(mention);
	        if (mention1 == null)
	            return ResponseEntity.noContent().build();

	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(mention1.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(mention1);
	    }
	    
	    //Récupérer un etudiant par son Id
	    @GetMapping(value = "/mentions/{id}")
	    public Mention afficherUneMention(@PathVariable Long id) {
	        return mentionRepository.getMentionById(id);
	    }
	    
	    @DeleteMapping (value = "/mentions/{id}")
	    public void supprimerMention(@PathVariable Long id) {
	    	mentionRepository.getMentionById(id);
	    }
	    
	    @RequestMapping(value = "/mentions/{id}" )
	    public ResponseEntity<Void> updateMention(@PathVariable Long id, @RequestBody Mention mention) {
	    	Mention mention1 =  mentionRepository.getMentionById(id);
	        if (mention1 == null)
	            return ResponseEntity.noContent().build();
	        
	        mention1.setDomaine( mention.getDomaine() );
	        mention1.setNom( mention.getNom() );
	        mention1.setMastere( mention.getMastere() );
	       
	        
	        
	        mentionRepository.save(mention1);
	        
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(mention1.getId())
	                .toUri();
	        return ResponseEntity.created(location).build();
	    }


}
