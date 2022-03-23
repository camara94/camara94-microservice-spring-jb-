package com.stardevcgroup.iset.controllers;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.stardevcgroup.iset.models.Distinction;
import com.stardevcgroup.iset.models.Etudiant;
import com.stardevcgroup.iset.repositories.DistinctionRepository;
import com.stardevcgroup.iset.repositories.EtudiantRepository;



@CrossOrigin("*")
@RestController
public class DistinctionController {
	@Autowired
	private DistinctionRepository distinctionRepository;
	@Autowired
	private EtudiantRepository etudiantRepository;
	
	//Récupérer la liste des produits
	@RequestMapping(value = "/distinctions", method = RequestMethod.GET)
	public List<Distinction> listeDistinctions() {
		List<Distinction> distinctions = distinctionRepository.findAll();      
		return  distinctions;
	}


	//Récupérer la liste des produits
	@RequestMapping(value = "/distinctions/{id}", method = RequestMethod.GET)
	public Distinction getDistinction(@PathVariable Long id) {
		Distinction distinction = distinctionRepository.getDistinctionById(id);
		return  distinction;
	}



	//ajouter un produit
	@PostMapping( value = "/distinctions" )
	public ResponseEntity<Distinction> ajouterDistinction(@RequestBody Distinction distinction) {

		Distinction distinction1 = distinctionRepository.save(distinction);
		if (distinction1 == null)
			return ResponseEntity.noContent().build();
		
		return ResponseEntity.created(null).body(distinction1);
	}
	
	 @PutMapping(value = "/distinctions/{id}")
	    public ResponseEntity<Void> updateDistinction(@PathVariable Long id, @RequestBody Distinction distinction) {
		 Distinction distinction1 =  distinctionRepository.getDistinctionById(id);
	        if (distinction1 == null)
	            return ResponseEntity.noContent().build();
	        
	        if ( distinction.getContext() != null )
	        	distinction1.setContext( distinction.getContext() );
	        if ( distinction.getDate() != null )
	        	distinction1.setDate( distinction.getDate() );
	        if ( distinction.getDescription() != null )
	        	distinction1.setDescription( distinction.getDescription() );
	        if ( distinction.getOrganisation() != null )
	        	distinction1.setOrganisation( distinction.getOrganisation() );
	        if ( distinction.getFile() != null )
	        	distinction1.setFile( distinction.getFile() );
	        
	        distinctionRepository.save(distinction1);
	        
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(distinction1.getId())
	                .toUri();
	        return ResponseEntity.created(location).build();
	    }


	//ajouter un
	@PatchMapping( value = "/distinctions/{id}/{distinctionId}" )
	public ResponseEntity<Distinction> ajouterDistinctionIdAEtudiant(@PathVariable long id, @PathVariable Long distinctionId) {

		Etudiant etudiant = etudiantRepository.getEtudiantById(id);
		Distinction distinction = distinctionRepository.getDistinctionById(distinctionId);
		List<Distinction> distinctions = new ArrayList<Distinction>();
		distinctions = etudiant.getDistinctions();
		distinctions.add(distinction);
		
		etudiant.setDistinctions(distinctions);
		
		if (distinction == null)
			return ResponseEntity.noContent().build();


		etudiantRepository.save(etudiant);
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(distinction.getId())
				.toUri();
		return ResponseEntity.created(location).body(distinction);
	}
	
	
	/*@RequestMapping(value = "/distinctions/{id}", method = RequestMethod.PUT )
    public ResponseEntity<Distinction> updateDistinctionWithId(@PathVariable Long id, @RequestBody Distinction distinction) {
		Distinction distinction1 =  distinctionRepository.getDistinctionById(id);
        if (distinction1 == null)
            return ResponseEntity.noContent().build();
        
        if ( distinction.getContext() != null )
        	distinction1.setContext( distinction.getContext() );
        if ( distinction.getDate() != null )
        	distinction1.setDate( distinction.getDate() );
        if ( distinction.getDescription() != null )
        	distinction1.setDescription( distinction.getDescription() );
        if ( distinction.getOrganisation() != null )
        	distinction1.setOrganisation( distinction.getOrganisation() );
        if ( distinction.getFile() != null )
        	distinction1.setFile( distinction.getFile() );
        
        distinctionRepository.save( distinction1 );
        
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(distinction1.getId())
                .toUri();
        return ResponseEntity.created(location).body(distinction1);
    }*/

	
	//suprression
		@DeleteMapping( value = "/distinctions/{id}/{distinctionId}" )
		public ResponseEntity<Distinction> supprimerDistinction(@PathVariable Long id, @PathVariable Long distinctionId) {

			Etudiant etudiant = etudiantRepository.getEtudiantById(id);
			Distinction distinction = distinctionRepository.getDistinctionById(distinctionId);
			Distinction dis = distinction;
			List<Distinction> distinctions = new ArrayList<Distinction>();
			distinctions = etudiant.getDistinctions();
			distinctions.remove(distinction);
			
			etudiant.setDistinctions(distinctions);
			
			if (distinction == null)
				return ResponseEntity.noContent().build();


			etudiantRepository.save(etudiant);
			distinctionRepository.delete(distinction);
			URI location = ServletUriComponentsBuilder
					.fromCurrentRequest()
					.path("/{id}")
					.buildAndExpand(etudiant.getId())
					.toUri();
			return ResponseEntity.created(location).body(dis);
		}

	
}
