package com.stardevcgroup.iset.controllers;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
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

import com.stardevcgroup.iset.business.ScoreDossierMastereInformatique;
import com.stardevcgroup.iset.models.ChampFormule;
import com.stardevcgroup.iset.models.Etudiant;
import com.stardevcgroup.iset.models.Mastere;
import com.stardevcgroup.iset.models.Type;
import com.stardevcgroup.iset.models.Mention;
import com.stardevcgroup.iset.repositories.ChampFormuleRepository;
import com.stardevcgroup.iset.repositories.EtudiantRepository;
import com.stardevcgroup.iset.repositories.MastereRepository;
import com.stardevcgroup.iset.repositories.MentionRepository;
import com.stardevcgroup.iset.repositories.TypeRepository;


@CrossOrigin("*")
@RestController
public class MastereController {

	@Autowired
	private MastereRepository mastereRepository;
	
	@Autowired
	private MentionRepository mentionRepository; 
	
	@Autowired
	private TypeRepository typeRepository;
	
	@Autowired
	private EtudiantRepository etudiantRepository;
	@Autowired
	private ChampFormuleRepository champFormuleRepository;


	    //Récupérer la liste des etudiants
	    @RequestMapping(value = "/masteres", method = RequestMethod.GET)
	    public List<Mastere> listeMasteres() {
	    	
	       List<Mastere> masteres = mastereRepository.findAll();
	       
	       List<Mastere> masteresDossierComplets = new ArrayList<Mastere>();
	       
	       ///for( Mas )
	       
	       for(int i=0; i < masteres.size(); i++ ) {
	    	   
	    	   for(int j=0; j < masteres.get(i).getEtudiants().size(); j++) {
	    		   
	    		   ScoreDossierMastereInformatique sc = new ScoreDossierMastereInformatique( 
								this.etudiantRepository.getEtudiantById(
										masteres.get(i).getEtudiants().get(j).getId().getEtudiantId()										
										),
								this.mastereRepository.getMastereById( 
										masteres.get(i).getEtudiants().get(j).getId().getMastereId()	
									)
								);
	    		   
	    		   masteres.get(i).getEtudiants().get(j).setScore( 
		    				   sc.getMoyenneAnneeUniversitaire()
		    				   +sc.getBonificationParcours()
		    				   +sc.getMoyenneBaccalaureat()
	    				   );
	    	   }
	       } 
	       
	       return  masteres;
	    }
	    
	  //ajouter un produit
	    @PatchMapping( value = "/masteres/{id}/mentions" )
	    public ResponseEntity<Void> ajouterMastereMention(@PathVariable Long id, @RequestBody Mention mention) {	    	
	    	Mastere mastere =  mastereRepository.getMastereById(id);
	    	mastere.setMention(mention);
	    	
	    	 if (mastere == null)
		            return ResponseEntity.noContent().build();
	    	
	    	 	mastereRepository.save(mastere);
	    	
		        URI location = ServletUriComponentsBuilder
		                .fromCurrentRequest()
		                .path("/{id}")
		                .buildAndExpand(mastere.getId())
		                .toUri();
		        return ResponseEntity.created(location).build();
	    }
	    
	    
	  //ajouter un produit
	    @PatchMapping( value = "/mastere-dis/{id}/{dis}" )
	    public ResponseEntity<Void> ajouterMastereDisponible(@PathVariable(name = "id") Long id, @PathVariable(name = "dis") int dis) {	    	
	    	Mastere mastere =  mastereRepository.getMastereById(id);
	    	mastere.setDisponible( dis );
	    	
	    	 if (mastere == null)
		            return ResponseEntity.noContent().build();
	    	
	    	 	mastereRepository.save(mastere);
	    	
		        URI location = ServletUriComponentsBuilder
		                .fromCurrentRequest()
		                .path("/{id}")
		                .buildAndExpand(mastere.getId())
		                .toUri();
		        return ResponseEntity.created(location).build();
	    }
	    
	    
	  //ajouter un etudiant
	    @RequestMapping( value = "/masteres", method = RequestMethod.POST, headers = "Accept=application/json")
	    @Transactional
	    public ResponseEntity<Mastere> ajouterMastere(@RequestBody Mastere mastere) {
	    	
	    	Mastere mastere1 =  mastereRepository.save(mastere);
	        if (mastere1 == null)
	            return ResponseEntity.noContent().build();

	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(mastere1.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(mastere1);
	    }
	    
	    
	    @PatchMapping( value = "/mastere-formule/{id}/{champFormuleId}" )
	    public ResponseEntity<ChampFormule> ajouterChampFormuleAUnMastere(@PathVariable Long id, @PathVariable Long champFormuleId) {
	    	
	    	Mastere mastere = mastereRepository.getMastereById(id);
	    	
	    	ChampFormule champFormule = champFormuleRepository.getChampFormuleById(champFormuleId);
	    	
	    	mastere.setChampFormule(champFormule);
	    	 
	        if (mastere == null)
	            return ResponseEntity.noContent().build();
	        
	        champFormuleRepository.save(champFormule);
	       mastereRepository.save(mastere);
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(mastere.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(champFormule);
	    } 
	    
	    @PatchMapping( value = "/mastere-formules/{id}" )
	    public ResponseEntity<ChampFormule> ajouterChampFormulesAUnMastere(@PathVariable Long id, @RequestBody ChampFormule champFormule) {
	    	
	    	Mastere mastere = mastereRepository.getMastereById(id);
	     	ChampFormule champFormules1 = champFormuleRepository.save(champFormule);
	  
	    	mastere.setChampFormule(champFormules1);
	    	 
	        if (mastere == null)
	            return ResponseEntity.noContent().build();
	        
	        //champFormuleRepository.save(champFormules);
	       mastereRepository.save(mastere);
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(mastere.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(champFormules1);
	    } 
	 
	    
	  //ajouter un etudiant
	    @PostMapping( value = "/masteres/{menId}/{tyId}/{etId}")
	    public ResponseEntity<Mastere> ajouterAutreMastere(@PathVariable Long menId, @PathVariable Long tyId, @PathVariable Long etId , @RequestBody Mastere mastere) {
	    	
	    	
	    	Mastere mastere1 = new Mastere();
	    	Mention mention = mentionRepository.getMentionById(menId);
	    	Type type = typeRepository.getTypeById(tyId);
	    		    	
	    	
	    	mastere1.setLibele(mastere.getLibele());
	    	mastere1.setMention(mention);
	    	mastere1.setType(type);
	        if (mastere1.getMention() == null || mastere1.getType() == null ) {
	            return ResponseEntity.noContent().build();
	        }
	        
	        mastereRepository.save(mastere1);
	       

	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(mastere1.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(mastere1);
	    
	     }
	    
	    
	    
	    
	    //Récupérer un etudiant par son Id
	    @GetMapping(value = "/masteres/{id}")
	    public ResponseEntity<Mastere> afficherUnMastere(@PathVariable Long id) {
	    	Mastere mastere =  mastereRepository.getMastereById(id);
	    	
	        if (mastere == null)
	            return ResponseEntity.noContent().build();
	        
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(mastere.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(mastere);
	    }
	    
	    @DeleteMapping (value = "/masteres/{id}")
	    public void supprimerMastere(@PathVariable Long id) {
	    	mastereRepository.getMastereById(id);
	    }
	    
	    @PatchMapping(value = "/masteres/{id}/{menId}/{tyId}" )
	    public ResponseEntity<Void> updateMastere(@PathVariable Long id, @PathVariable Long menId, @PathVariable Long tyId) {
	    	Mastere mastere1 =  mastereRepository.getMastereById(id);
	    	Mention mention = mentionRepository.getMentionById(menId);
	    	Type type = typeRepository.getTypeById(tyId);
	        if (mastere1 == null)
	            return ResponseEntity.noContent().build();
	        
	        mastere1.setMention(mention);
	        mastere1.setType(type);
	        
	        
	        mastereRepository.save(mastere1);
	        
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(mastere1.getId())
	                .toUri();
	        return ResponseEntity.created(location).build();
	    }
	    
	    
	  //ajouter un produit
	   
	    @PatchMapping( value = "/masteres/{id}/{etudiantId}" )
	    //@CrossOrigin("http://localhost:8080/masteres/{id}/etudiants/{etudiantId}")
	    public ResponseEntity<String> ajouterUnEtudiantAUnMastere(@PathVariable Long id, @PathVariable Long etudiantId) {
	    	
	    	Mastere mastere = mastereRepository.getMastereById(id);
	    	Etudiant etudiant = etudiantRepository.getEtudiantById(etudiantId);
	    	mastere.addEtudiant(etudiant);
	    	
	        if (mastere == null || etudiant == null)
	            return ResponseEntity.noContent().build();
	        
	        
	        mastereRepository.save(mastere);
	        String message = "L'étudiant " + etudiant.getPrenom() + " est inscrit au mastère" + mastere.getLibele();
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(mastere.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(message);
	    }
	
}