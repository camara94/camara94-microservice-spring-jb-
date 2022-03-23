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

import com.stardevcgroup.iset.models.Etudiant;
import com.stardevcgroup.iset.models.Formation;
import com.stardevcgroup.iset.repositories.EtudiantRepository;
import com.stardevcgroup.iset.repositories.FormationRepository;



@CrossOrigin("*")
@RestController
public class FormationController {
	@Autowired
	 private FormationRepository formationRepository;
	
	@Autowired
	 private EtudiantRepository etudiantRepository;

	    //Récupérer la liste des etudiants
	    @RequestMapping(value = "/formations", method = RequestMethod.GET)
	    public List<Formation> listeFormation() {
	       List<Formation> formations = formationRepository.findAll();	       
	       return  formations;
	    }
	    
	  //ajouter un 
	    @PostMapping( value = "/formations" )
	    public ResponseEntity<Formation> ajouterFormation(@RequestBody Formation formation) {
	    	
	    	Formation formation1 =  formationRepository.save(formation);
	        if (formation1 == null)
	            return ResponseEntity.noContent().build();

	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(formation1.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(formation1);
	    }
	    
	    //Récupérer un etudiant par son Id
	    @GetMapping(value = "/formations/{id}")
	    public Formation afficherUneFormation(@PathVariable Long id) {
	        return formationRepository.getFormationById(id);
	    }
	    
	    
	    @DeleteMapping (value = "/formations/{id}/{idEt}")
	    public void supprimerFormation(@PathVariable Long id, @PathVariable Long idEt) {
	    	
	    	Etudiant etudiant = etudiantRepository.getEtudiantById(idEt);
	    	
	    	Formation formation = formationRepository.getFormationById(id);
	    	
	    	List<Formation> formations = new ArrayList<Formation>();
	    	
	    	//etudiantRepository.save(etudiant);
	    	//diplomeRepository.delete( etudiant.getDiplome(id) );
	    	//diplomeRepository.deleteByDiplomesId(id);//.deleteById(id);
	    	//etudiantRepository.deleteById(diplome.getId());
	    	
	    	formations = etudiant.getFormations();
	    	formations.remove(formation);
	    	etudiant.setFormations(formations);
	    	etudiantRepository.save(etudiant);
	    	formationRepository.delete(formation);
	    }
	    
	    @RequestMapping(value = "/formations/{id}", method = RequestMethod.PUT )
	    public ResponseEntity<Void> updateFormation(@PathVariable Long id, @RequestBody Formation formation) {
	    	Formation formation1 =  formationRepository.getFormationById(id);
	        if (formation1 == null)
	            return ResponseEntity.noContent().build();
	        
	        if ( formation.getDateDebut() != null )
	        	formation1.setDateDebut( formation.getDateDebut() );
	        if ( formation.getDateFin() != null )
	        	formation1.setDateFin( formation.getDateFin() );
	        if ( formation.getDuree() > 0 )
	        	formation1.setDuree( formation.getDuree() );
	        if ( formation.getTitre() != null )
	        	formation1.setTitre( formation.getTitre() );
	        if ( formation.getPlateforme() != null )
	        	formation1.setPlateforme( formation.getPlateforme() );
	        if ( formation.getTypeDuree() != null )
	        	formation1.setTypeDuree( formation.getTypeDuree() );
	        if ( formation.getFile() != null )
	        	formation1.setFile( formation.getFile() );
	        
	        formationRepository.save(formation1);
	        
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(formation1.getId())
	                .toUri();
	        return ResponseEntity.created(location).build();
	    }
}
