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

import com.stardevcgroup.iset.models.AnneeUniversitaire;
import com.stardevcgroup.iset.models.Diplome;
import com.stardevcgroup.iset.repositories.AnneeUniversitaireRepository;
import com.stardevcgroup.iset.repositories.DiplomeRepository;


@CrossOrigin("*")
@RestController
public class AnneeUniversitaireController {
	
	@Autowired
	private AnneeUniversitaireRepository anneeUniversitaireRepository;
	@Autowired
	private DiplomeRepository diplomeRepository;
	
	    //Récupérer la liste des etudiants
	    @RequestMapping(value = "/releves", method = RequestMethod.GET)
	    public List<AnneeUniversitaire> listeAnneeUniversitaire() {
	       List<AnneeUniversitaire> curcus = anneeUniversitaireRepository.findAll();       
	       return  curcus;
	    }
	    
	  //ajouter un etudiant
	    @PostMapping( value = "/releves" )
	    public ResponseEntity<AnneeUniversitaire> ajouterFormation(@RequestBody AnneeUniversitaire anneeUniversitaire) {
	    	
	    	AnneeUniversitaire anneeUniversitaire1 = anneeUniversitaireRepository.save(anneeUniversitaire);
	        if (anneeUniversitaire1 == null)
	            return ResponseEntity.noContent().build();

	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(anneeUniversitaire1.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(anneeUniversitaire1);
	    }
	    
	    //Récupérer un etudiant par son Id
	    @GetMapping(value = "/releves/{id}")
	    public AnneeUniversitaire afficherUneAnneeUniversitaire(@PathVariable Long id) {
	        return anneeUniversitaireRepository.getAnneeUniversitaireById(id);
	    }
	    
	    
	    @DeleteMapping (value = "/releves/{id}/{idDiplome}")
	    public ResponseEntity<String> supprimerUneAnneeUniversitaire(@PathVariable Long id, @PathVariable Long idDiplome) {
	    	AnneeUniversitaire anneeUniversitaire = anneeUniversitaireRepository.getAnneeUniversitaireById(id);
	    	Diplome diplome = diplomeRepository.getDiplomesById(idDiplome);
	    	
	    	if (anneeUniversitaire == null)
	            return ResponseEntity.noContent().build();
	    	
	    	List<AnneeUniversitaire> anneeUniversitaires = diplome.getAnneeUniversitaires();
	    	anneeUniversitaires.remove(anneeUniversitaire);
	    	diplome.setAnneeUniversitaires(anneeUniversitaires);
	    	diplomeRepository.save(diplome);
	    	anneeUniversitaireRepository.delete( anneeUniversitaire );
	    	String message = "Vous avez supprimé formation d'ID: " + anneeUniversitaire.getId();
	    	
	    	URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(anneeUniversitaire.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(message);
	    }
	    
	    @DeleteMapping (value = "/releves-all/{id}/{idDiplome}")
	    public ResponseEntity<String> supprimerTousAnneeUniversitaire(@PathVariable Long id, @PathVariable Long idDiplome) {
	    	AnneeUniversitaire anneeUniversitaire = anneeUniversitaireRepository.getAnneeUniversitaireById(id);
	    	Diplome diplome = diplomeRepository.getDiplomesById(idDiplome);
	    	
	    	if (anneeUniversitaire == null)
	            return ResponseEntity.noContent().build();
	    	
	    	List<AnneeUniversitaire> anneeUniversitaires = diplome.getAnneeUniversitaires();
	    	anneeUniversitaires.clear();
	    	diplome.setAnneeUniversitaires(anneeUniversitaires);
	    	diplomeRepository.save(diplome);
	    	anneeUniversitaireRepository.delete( anneeUniversitaire );
	    	String message = "Vous avez supprimé formation d'ID: " + anneeUniversitaire.getId();
	    	
	    	URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(anneeUniversitaire.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(message);
	    }
	    
	    @RequestMapping(value = "/releves/{id}", method = RequestMethod.PUT )
	    public ResponseEntity<AnneeUniversitaire> updateUneAnneeUniversitaire(@PathVariable Long id, @RequestBody AnneeUniversitaire anneeUniversitaire) {
	    	AnneeUniversitaire anneeUniversitaire1 =  anneeUniversitaireRepository.getAnneeUniversitaireById(id);
	        if (anneeUniversitaire1 == null)
	            return ResponseEntity.noContent().build();
	        if(anneeUniversitaire.getAnnee() != null)
	        	anneeUniversitaire1.setAnnee( anneeUniversitaire.getAnnee() );
	        if(anneeUniversitaire.getMoyenne() < 0)
		        anneeUniversitaire1.setMoyenne( anneeUniversitaire.getMoyenne() );
	        if(anneeUniversitaire.getTitre() != null)
		        anneeUniversitaire1.setTitre( anneeUniversitaire.getTitre() );
	        if(anneeUniversitaire.getFile() != null)
		        anneeUniversitaire1.setFile( anneeUniversitaire.getFile() );
	        if(anneeUniversitaire.getSession() != null)
		        anneeUniversitaire1.setSession(anneeUniversitaire.getSession());
	        
	        anneeUniversitaireRepository.save(anneeUniversitaire1);
	        
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(anneeUniversitaire1.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(anneeUniversitaire1);
	    }
}
