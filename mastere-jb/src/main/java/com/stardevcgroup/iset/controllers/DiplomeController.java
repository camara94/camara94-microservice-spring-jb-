package com.stardevcgroup.iset.controllers;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.stardevcgroup.iset.models.AnneeUniversitaire;
import com.stardevcgroup.iset.models.Diplome;
import com.stardevcgroup.iset.models.Etudiant;
import com.stardevcgroup.iset.repositories.AnneeUniversitaireRepository;
import com.stardevcgroup.iset.repositories.DiplomeRepository;
import com.stardevcgroup.iset.repositories.EtablissementRepository;
import com.stardevcgroup.iset.repositories.EtudiantRepository;

import javassist.NotFoundException;

@CrossOrigin("*")
@RestController
public class DiplomeController {
	
	@Autowired
	 private DiplomeRepository diplomeRepository;
	
	 @Autowired
	 private AnneeUniversitaireRepository anneeUniversitaireRepository;
	 
	 @Autowired
	 private EtablissementRepository etablissementRepository;
	 
	 @Autowired
	 private EtudiantRepository etudiantRepository;

	    //Récupérer la liste des etudiants
	    @RequestMapping(value = "/diplomes", method = RequestMethod.GET)
	    public List<Diplome> listeDiplome() {
	       List<Diplome> diplomes = diplomeRepository.findAll();
	       
	       return  diplomes;
	    }
	    
	  //Récupérer la liste des etudiants
	    @RequestMapping(value = "/diplomes/{id}", method = RequestMethod.GET)
	    public Diplome getDiplomeById(@PathVariable Long id) {
	       Diplome diplome = diplomeRepository.getDiplomesById(id);
	       
	       return  diplome;
	    }
	    
	  //ajouter un 
	    @PostMapping( value = "/diplomes/{idEt}" )
	    public ResponseEntity<Diplome> ajouterDiplome(@PathVariable Long idEt, @RequestBody Diplome diplome) {
	    	
	    	Etudiant etudiant = etudiantRepository.getEtudiantById(idEt);
	    	
	    	//diplome.setEtablissement(etablissement);
	    	Diplome diplome1 =  diplomeRepository.save(diplome);
	    	
	    	
	        if (diplome1 == null)
	            return ResponseEntity.noContent().build();
	        
	        etudiant.setDiplome(diplome1);
	        etudiantRepository.save(etudiant);
	        diplomeRepository.save(diplome1);
	        
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(diplome1.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(diplome1);
	    }
	    
	 // @Transactional
	    @DeleteMapping (value = "/diplomes/{id}/{idEt}")
	    public void supprimerDiplome(@PathVariable Long id, @PathVariable Long idEt) {
	    	Etudiant etudiant = etudiantRepository.getEtudiantById(idEt);
	    	
	    	Diplome diplome = diplomeRepository.getDiplomesById(id);
	    	diplome.removeAllReveles();
	    	//diplome.removeEtablissement();
	    	diplomeRepository.save(diplome);
	    	diplome = diplomeRepository.getDiplomesById(id);
	    	List<Diplome> diplomes = new ArrayList<Diplome>();
	    	
	    	//etudiantRepository.save(etudiant);
	    	//diplomeRepository.delete( etudiant.getDiplome(id) );
	    	//diplomeRepository.deleteByDiplomesId(id);//.deleteById(id);
	    	//etudiantRepository.deleteById(diplome.getId());
	    	diplomes = etudiant.getDiplomes();
	    	diplomes.remove(diplome);
	    	etudiant.setDiplomes(diplomes);
	    	etudiantRepository.save(etudiant);
	    	diplomeRepository.delete(diplome);
	    }
	     
	    
	    @RequestMapping(value = "/diplomes/{id}/{idEt}", method = RequestMethod.PUT )
	    public ResponseEntity<Diplome> updateDiplome(@PathVariable Long id, @PathVariable Long idEt, @RequestBody Diplome diplome) {
	    	Diplome diplome1 =  diplomeRepository.getDiplomesById(id);
	        if (diplome1 == null)
	            return ResponseEntity.noContent().build();
	        if( diplome.getAnnee() != null)
	        	diplome1.setAnnee( diplome.getAnnee() );
	        if( diplome.getTitre() != null)
		        diplome1.setTitre( diplome.getTitre() );
	        if( diplome.getFile() != null)
		        diplome1.setFile( diplome.getFile() );
	        //if( diplome.getNombreAnneeUniversitaire() > 0 )
	        	//diplome1.setNombreAnneeUniversitaire( diplome.getNombreAnneeUniversitaire() );
	        /*if( diplome.getEtablissement() != null) {
	        	Etablissement etab = new Etablissement();
	        	etab = etablissementRepository.getEtablissementById(idEt);
	        	//diplome1.setEtablissement( etab );
	        	etab.setDiplome(diplome1);
	        	etablissementRepository.save(etab);
	        }	   */     
	       /* if( diplome.getAnneeUniversitaires() != null )
	        	diplome1.setAnneeUniversitaires( diplome.getAnneeUniversitaires() );*/
	       
	        
	       diplomeRepository.save(diplome1);
	        
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(diplome1.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(diplome1);
	    }
	    
	    @PatchMapping( value = "/diplome-releve/{id}/{anneeId}" )
	    public ResponseEntity<AnneeUniversitaire> ajouterRelevesAUnADiplome(@PathVariable Long id, @PathVariable Long anneeId) {
	    	
	    	
	    	
	    	Diplome diplome = diplomeRepository.getDiplomesById(id);
	    	AnneeUniversitaire anneeUniversitaire = anneeUniversitaireRepository.getAnneeUniversitaireById(anneeId);
	    	
	    	diplome.setAnneeUniversitaire(anneeUniversitaire);
	    	
	        if (diplome == null)
	            return ResponseEntity.noContent().build();
	        
	        
	        diplomeRepository.save(diplome);
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(diplome.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(anneeUniversitaire);
	    }
	    

}
