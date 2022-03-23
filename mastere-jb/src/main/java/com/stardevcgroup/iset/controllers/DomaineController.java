package com.stardevcgroup.iset.controllers;

import java.net.URI;
import java.util.List;

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
import com.stardevcgroup.iset.repositories.DomaineRepository;



@CrossOrigin("*")
@RestController
public class DomaineController {
	
	@Autowired
	 private DomaineRepository domaineRepository;

	    //Récupérer la liste des etudiants
	    @RequestMapping(value = "/domaines", method = RequestMethod.GET)
	    public List<Domaine> listeDomaines() {
	       List<Domaine> etablissements = domaineRepository.findAll();
	       
	       return  etablissements;
	    }
	    
	  //ajouter un etudiant
	    @PostMapping( value = "/domaines" )
	    public ResponseEntity<Domaine> ajouterDomaine(@RequestBody Domaine domaine) {
	    	
	    	Domaine domaine1 =  domaineRepository.save(domaine);
	        if (domaine1 == null)
	            return ResponseEntity.noContent().build();

	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(domaine1.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(domaine1);
	    }
	    
	    //Récupérer un etudiant par son Id
	    @GetMapping(value = "/domaines/{id}")
	    public Domaine afficherUnDomaine(@PathVariable Long id) {
	        return domaineRepository.getDomaineById(id);
	    }
	    
	    @DeleteMapping (value = "/domaines/{id}")
	    public void supprimerDomaine(@PathVariable Long id) {
	    	Domaine domaine = domaineRepository.getDomaineById(id);
	    	domaineRepository.delete(domaine);
	    }
	    
	    @PatchMapping(value = "/domaines/{id}"  )
	    public ResponseEntity<Void> updateDomaine(@PathVariable Long id, @RequestBody Domaine domaine) {
	    	Domaine domaine1 =  domaineRepository.getDomaineById(id);
	        if (domaine1 == null)
	            return ResponseEntity.noContent().build();
	        
	        domaine1.setLibelle( domaine.getLibelle() );
	       
	        
	        domaineRepository.save(domaine1);
	        
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(domaine1.getId())
	                .toUri();
	        return ResponseEntity.created(location).build();
	    }

}
