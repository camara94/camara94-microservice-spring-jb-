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

import com.stardevcgroup.iset.models.Certificat;
import com.stardevcgroup.iset.models.Etudiant;
import com.stardevcgroup.iset.repositories.CertificatRepository;
import com.stardevcgroup.iset.repositories.EtudiantRepository;


@CrossOrigin("*")
@RestController
public class CertificatController {
	@Autowired
	 private CertificatRepository certificatRepository;
	
	@Autowired
	 private EtudiantRepository etudiantRepository;

	    //Récupérer la liste 
	    @RequestMapping(value = "/certificats", method = RequestMethod.GET)
	    public List<Certificat> listeCertificats() {
	       List<Certificat> certificats = certificatRepository.findAll();	       
	       return  certificats;
	    }
	    
	  //ajouter un 
	    @PostMapping( value = "/certificats" )
	    public ResponseEntity<Certificat> ajouterCertificat(@RequestBody Certificat certificat) {
	    	
	    	Certificat certificat1 =  certificatRepository.save(certificat);
	        if (certificat1 == null)
	            return ResponseEntity.noContent().build();

	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(certificat1.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(certificat1);
	    }
	    
	    //Récupérer un etudiant par son Id
	    @GetMapping(value = "/certificats/{id}")
	    public ResponseEntity<Certificat> afficherUnCertificat(@PathVariable Long id) {
	    	Certificat certificat =  certificatRepository.getCertificatById(id);
	    	 if (certificat == null)
		          return ResponseEntity.noContent().build();


	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(certificat.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(certificat);
	    }
	    
	    
	    @DeleteMapping (value = "/certificats/{id}/{idEt}")
	    public void supprimerCertificat(@PathVariable Long id, @PathVariable Long idEt) {
	    	
	    	Certificat certificat = certificatRepository.getCertificatById(id);
	    	List<Certificat> certificats = new ArrayList<Certificat>();
	    	
	    	Etudiant etudiant = etudiantRepository.getEtudiantById(idEt);
	    	
	    	//etudiantRepository.save(etudiant);
	    	//diplomeRepository.delete( etudiant.getDiplome(id) );
	    	//diplomeRepository.deleteByDiplomesId(id);//.deleteById(id);
	    	//etudiantRepository.deleteById(diplome.getId());
	    	
	    	certificats = etudiant.getCertificats();
	    	certificats.remove( certificat );
	    	
	    	etudiant.setCertificats(certificats);
	    	etudiantRepository.save(etudiant);
	    	certificatRepository.delete(certificat);
	    }
	    
	    @RequestMapping(value = "/certificats/{id}", method = RequestMethod.PUT )
	    public ResponseEntity<Certificat> updateCertificat(@PathVariable Long id, @RequestBody Certificat certificat) {
	    	Certificat certificat1 =  certificatRepository.getCertificatById(id);
	        if (certificat1 == null)
	            return ResponseEntity.noContent().build();
	        
	        if(certificat.getIntitule()!= null)
	        	certificat1.setIntitule(certificat.getIntitule());
	        if(certificat.getEtudiant() != null)
	        	certificat1.setEtudiant(certificat.getEtudiant());
	        if(certificat.getDate() != null)
	        	certificat1.setDate( certificat1.getDate() );
	        if( certificat.getFile() != null )
	        	certificat1.setFile( certificat.getFile() );
	        if( certificat.getOrganisme() != null )
	        	certificat1.setOrganisme( certificat.getOrganisme() );
	       
	        
	        certificatRepository.save(certificat1);
	        URI location = ServletUriComponentsBuilder
	                .fromCurrentRequest()
	                .path("/{id}")
	                .buildAndExpand(certificat1.getId())
	                .toUri();
	        return ResponseEntity.created(location).body(certificat1);
	    }

}
