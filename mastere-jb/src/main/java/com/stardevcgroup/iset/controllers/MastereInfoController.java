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

import com.stardevcgroup.iset.models.MastereInfo;
import com.stardevcgroup.iset.repositories.MastereInfoRepository;


@CrossOrigin("*")
@RestController
public class MastereInfoController {
	@Autowired
	private MastereInfoRepository mastereInfoRepository;

	    //Récupérer la liste 
	    @RequestMapping(value = "/mastere-infos", method = RequestMethod.GET)
	    public List<MastereInfo> listeMastereInfos() {
	       List<MastereInfo> mastereInfos = this.mastereInfoRepository.findAll();	       
	       return  mastereInfos;
	    }
	    
	  //ajouter un 
	    @PostMapping( value = "/mastere-infos" )
	    public ResponseEntity<MastereInfo> ajouterMastereInfo(@RequestBody MastereInfo mastereInfo) {
	    	
	    	MastereInfo mastereInfo1 =  this.mastereInfoRepository.save(mastereInfo);
	        if (mastereInfo1 == null)
	            return ResponseEntity.noContent().build();

	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(mastereInfo1.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(mastereInfo1);
	    }
	    
	    //Récupérer un etudiant par son Id
	    @GetMapping(value = "/mastere-infos/{id}")
	    public ResponseEntity<MastereInfo> afficherUnMastereInfo(@PathVariable Long id) {
	    	MastereInfo mastereInfo =  this.mastereInfoRepository.getMastereInfoById(id);
	    	 if (mastereInfo == null)
		          return ResponseEntity.noContent().build();


	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(mastereInfo.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(mastereInfo);
	    }
	    
	    
	    @DeleteMapping (value = "/mastere-infos/{id}")
	    public void supprimerMastereInfo(@PathVariable Long id) {
	    	
	    	MastereInfo mastereInfo = this.mastereInfoRepository.getMastereInfoById(id);
	    	
	    	
	    	this.mastereInfoRepository.delete(mastereInfo);
	    }
	    
	    @RequestMapping(value = "/mastere-infos/{id}", method = RequestMethod.PUT )
	    public ResponseEntity<MastereInfo> updateMastereInfo(@PathVariable Long id, @RequestBody MastereInfo mastereInfo) {
	    	MastereInfo mastereInfo1 =  this.mastereInfoRepository.getMastereInfoById(id);
	        if (mastereInfo1 == null)
	            return ResponseEntity.noContent().build();
	        
	        if( mastereInfo.getTitre() != null)
	        	mastereInfo1.setTitre( mastereInfo.getTitre() );
	        if( mastereInfo.getDescription() != null)
	        	mastereInfo1.setDescription( mastereInfo.getDescription() );
	        if(mastereInfo.getMetier() != null)
	        	mastereInfo1.setMetier( mastereInfo.getMetier() );
	        if( mastereInfo.getModalite() != null)
	        	mastereInfo1.setModalite( mastereInfo.getModalite() );
	        if( mastereInfo.getPublicCible() != null )
	        	mastereInfo1.setPublicCible( mastereInfo.getPublicCible() );
	        if( mastereInfo.getSecteur() != null )
	        	mastereInfo1.setSecteur( mastereInfo.getSecteur() );
	        if ( mastereInfo.getObjectif() != null )
	        	mastereInfo1.setObjectif( mastereInfo.getObjectif() );
	        
	        this.mastereInfoRepository.save( mastereInfo1 );
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(mastereInfo1.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(mastereInfo1);
	    }

}
