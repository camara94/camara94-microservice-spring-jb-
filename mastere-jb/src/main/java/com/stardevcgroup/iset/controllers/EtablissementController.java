package com.stardevcgroup.iset.controllers;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
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

import com.stardevcgroup.iset.models.Diplome;
import com.stardevcgroup.iset.models.Etablissement;
import com.stardevcgroup.iset.models.Mastere;
import com.stardevcgroup.iset.repositories.DiplomeRepository;
import com.stardevcgroup.iset.repositories.EtablissementRepository;
import com.stardevcgroup.iset.repositories.MastereRepository;



@CrossOrigin("*")
@RestController
public class EtablissementController {

	@Autowired
	private EtablissementRepository etablissementRepository;

	@Autowired
	private DiplomeRepository diplomeRepository;
	
	@Autowired
	private MastereRepository mastereRepository;
	
	//Récupérer la liste des produits
	@RequestMapping(value = "/etablissements", method = RequestMethod.GET)
	public List<Etablissement> listeEtablissements() {
		List<Etablissement> etablissements = etablissementRepository.findAll();      
		return  etablissements;
	}


	//Récupérer la liste 
	@RequestMapping(value = "/etablissements/{id}", method = RequestMethod.GET)
	public Etablissement getEtablissement(@PathVariable Long id) {
		Etablissement etablissement = etablissementRepository.getEtablissementById(id);
		return  etablissement;
	}


	@DeleteMapping(value = "/etablissements/{id}")
	public void supprimerEtablissement(@PathVariable Long id) {
		Etablissement etablissement = etablissementRepository.getEtablissementById(id);
		List<Diplome> diplomes = new ArrayList<Diplome>();
		List<Mastere> masteres = new ArrayList<Mastere>();

		for(int i = 0; i < etablissement.getDiplomes().size(); i++) {
			etablissement.getDiplomes().remove(etablissement.getDiplomes().get(i));
		}

		for(int i = 0; i < etablissement.getMasteres().size(); i++) {
			etablissement.getMasteres().remove(etablissement.getMasteres().get(i));
		}
		etablissementRepository.save(etablissement);
		etablissementRepository.delete(etablissement);
	}



	//ajouter un produit
	@PostMapping( value = "/etablissements" )
	public ResponseEntity<Etablissement> ajouterEtablissement1(@RequestBody Etablissement etablissement) {

		Etablissement etablissement1 =  etablissementRepository.save(etablissement);
		if (etablissement1 == null)
			return ResponseEntity.noContent().build();
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(etablissement1.getId())
				.toUri();
		return ResponseEntity.created(location).body(etablissement1);
	}


	//ajouter un produit
	@PatchMapping( value = "/etablissements/{id}/{mastereId}" )
	public ResponseEntity<Mastere> ajouterMasterAEtablissement(@PathVariable Long id, @PathVariable Long mastereId) {

		Etablissement etablissement1 = etablissementRepository.getEtablissementById(id);
		Mastere mastere = new Mastere();
		mastere.setId(mastereId);	
		etablissement1.setMastere(mastere);

		if (etablissement1 == null)
			return ResponseEntity.noContent().build();


		etablissementRepository.save(etablissement1);
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(etablissement1.getId())
				.toUri();
		return ResponseEntity.created(location).body(mastere);
	}

	//ajouter un produit
	@PatchMapping( value = "/etablissements/{id}/diplomes/{diplomeId}" )
	public ResponseEntity<Diplome> ajouterDiplomeAEtablissement(@PathVariable Long id, @PathVariable Long diplomeId) {

		Etablissement etablissement1 = etablissementRepository.getEtablissementById(id);
		Diplome diplome = new Diplome();
		diplome.setId(diplomeId);	
		etablissement1.setDiplome(diplome);

		if (etablissement1 == null)
			return ResponseEntity.noContent().build();


		etablissementRepository.save(etablissement1);
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(etablissement1.getId())
				.toUri();
		return ResponseEntity.created(location).body(diplome);
	}

	//ajouter un produit
	@GetMapping( value = "/etablissements/{id}/masteres/{maId}" )
	public Mastere getMastereByEtablissement(@PathVariable Long id, @PathVariable Long maId) {

		Etablissement etablissement1 =  etablissementRepository.getEtablissementById(id);


		return etablissement1.getMastere(maId);
	}
}
