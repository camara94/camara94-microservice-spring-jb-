package com.stardevcgroup.iset.controllers;

import java.net.URI;
import java.util.List;

import javax.transaction.Transactional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.stardevcgroup.iset.models.User;
import com.stardevcgroup.iset.repositories.UserRepository;


@RestController

public class UserController {
	
	@Autowired
	private UserRepository userRepository;

	//Récupérer la liste des etudiants
    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public List<User> listeUsers() {
       List<User> users = userRepository.findAll();
       
       
       return  users;
    }
    
  //ajouter un etudiant
   @RequestMapping( value = "/users", method = RequestMethod.POST, headers = "Accept=application/json")
   @Transactional
    //@PostMapping(value =  "/etudiants")
    public ResponseEntity<User> ajouterUser(@RequestBody User user) {
    	
    	User user1 = userRepository.save(user);
        if (user1 == null)
            return ResponseEntity.noContent().build();

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(user1.getId())
                .toUri();
        return ResponseEntity.created(location).body(user1);
    }
   
   @DeleteMapping (value = "/users/{id}")
   public void supprimerUser(@PathVariable Long id) {
   	 User user = userRepository.getUserById(id);
   	 userRepository.delete(user);
   }

}
