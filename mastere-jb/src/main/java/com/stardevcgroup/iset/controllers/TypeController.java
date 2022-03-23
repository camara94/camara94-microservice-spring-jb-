package com.stardevcgroup.iset.controllers;

import java.net.URI;
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

import com.stardevcgroup.iset.models.Type;
import com.stardevcgroup.iset.repositories.TypeRepository;



@CrossOrigin("*")
@RestController
public class TypeController {
	@Autowired
	 private TypeRepository typeRepository;

	    //Récupérer la liste des etudiants
	    @RequestMapping(value = "/types", method = RequestMethod.GET)
	    public List<Type> listeTypes() {
	       List<Type> types = typeRepository.findAll();
	       
	       return  types;
	    }
	    
	  //ajouter un etudiant
	    @PostMapping( value = "/types")
	    public ResponseEntity<Type> ajouterType(@RequestBody Type type) {
	    	
	    	Type type1 =  typeRepository.save(type);
	        if (type1 == null)
	            return ResponseEntity.noContent().build();

	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(type1.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(type1);
	    }
	    
	    //Récupérer un etudiant par son Id
	    @GetMapping(value = "/types/{id}")
	    public Type afficherUnType(@PathVariable Long id) {
	        return typeRepository.getTypeById(id);
	    }   
	    
	    /*@DeleteMapping (value = "/etudiants/{id}")
	    public void supprimerType(@PathVariable Long id) {
	    	Type type1=typeRepository.getTypeById(id);
	    }*/
	    
	    @RequestMapping(value = "/types/{id}", method = RequestMethod.PUT )
	    public ResponseEntity<Void> updateType(@PathVariable Long id, @RequestBody Type type) {
	    	Type type1 =  typeRepository.getTypeById(id);
	        if (type1 == null)
	            return ResponseEntity.noContent().build();
	        
	        type1.setNom( type.getNom() );
	        
	        typeRepository.save(type1);
	        
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(type1.getId())
	                .toUri();
	        return ResponseEntity.created(location).build();
	    }

}
