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

import com.stardevcgroup.iset.models.Bac;
import com.stardevcgroup.iset.models.Etudiant;
import com.stardevcgroup.iset.repositories.BacRepository;
import com.stardevcgroup.iset.repositories.EtudiantRepository;



@CrossOrigin("*")
@RestController
public class BacController {
	@Autowired
	 private BacRepository bacRepository;
	
	@Autowired
	 private EtudiantRepository etudiantRepository;

	    //Récupérer la liste des etudiants
	    @RequestMapping(value = "/bac", method = RequestMethod.GET)
	    public List<Bac> listeBac() {
	       List<Bac> bacs = bacRepository.findAll();	       
	       return  bacs;
	    }
	    
	  //ajouter un 
	    @PostMapping( value = "/bac" )
	    public ResponseEntity<Bac> ajouterBac(@RequestBody Bac bac) {
	    	
	    	Bac bac1 =  bacRepository.save(bac);
	        if (bac1 == null)
	            return ResponseEntity.noContent().build();

	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(bac1.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(bac1);
	    }
	    
	    //Récupérer un etudiant par son Id
	    @GetMapping(value = "/bac/{id}")
	    public ResponseEntity<Bac> afficherUnBac(@PathVariable Long id) {
	    	Bac bac =  bacRepository.getBacById(id);
	    	 if (bac == null)
		          return ResponseEntity.noContent().build();


	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(bac.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(bac);
	    }
	    
	    
	    @DeleteMapping (value = "/bac/{id}/{idEt}")
	    public void supprimerBac(@PathVariable Long id, @PathVariable Long idEt) {
	    	
	    	Etudiant etudiant = etudiantRepository.getEtudiantById(idEt);
	    	
	    	Bac bac = bacRepository.getBacById(id);
	    	
	    	Bac bac1 = new Bac();
	    	
	    	//etudiantRepository.save(etudiant);
	    	//diplomeRepository.delete( etudiant.getDiplome(id) );
	    	//diplomeRepository.deleteByDiplomesId(id);//.deleteById(id);
	    	//etudiantRepository.deleteById(diplome.getId());
	    	
	    	bac1 = etudiant.getBac();
	    	bac1 = null;
	    	etudiant.setBac(bac1);
	    	etudiantRepository.save(etudiant);
	    	bacRepository.delete(bac);
	    }
	    
	    @RequestMapping(value = "/bac/{id}", method = RequestMethod.PUT )
	    public ResponseEntity<Bac> updateBac(@PathVariable Long id, @RequestBody Bac bac) {
	    	Bac bac1 =  bacRepository.getBacById(id);
	        if (bac1 == null)
	            return ResponseEntity.noContent().build();
	        
	        if(bac.getAnnee() != null)
	        	bac1.setAnnee(bac.getAnnee());
	        if(bac.getEcole() != null)
	        	bac1.setEcole(bac.getEcole());
	        if( bac.getOption() != null )
	        	bac1.setOption(bac.getOption());
	        if( bac.getMoyenne() > 0 )
	        	bac1.setMoyenne(bac.getMoyenne());
	        if( bac.getFile() != null )
	        	bac1.setFile(bac.getFile());
	        
	        bacRepository.save(bac1);
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(bac1.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(bac1);
	    }
	    
	  
}
