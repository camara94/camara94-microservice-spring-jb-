package com.stardevcgroup.iset.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@Entity
public class Etablissement implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue( strategy = GenerationType.AUTO )
	private Long id;
	private String nom;
	@OneToMany
	private List<Mastere> masteres;
	
	@OneToMany//(fetch = FetchType.EAGER,  orphanRemoval = true) //, cascade = {PERSIST, MERGE, REFRESH, DETACH},
	//@NotFound(action = NotFoundAction.IGNORE)
	List<Diplome> diplomes = new ArrayList<Diplome>();
	
	
	@OneToMany//(mappedBy = "etablissement", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	//@JsonManagedReference
	//@JsonIgnore
	private List<Etudiant> etudiants = new ArrayList<Etudiant>() ;
	
	
	
	public List<Etudiant> getEtudiants() {
		return etudiants;
	}

	public void setEtudiants(List<Etudiant> etudiants) {
		this.etudiants = etudiants;
	}

	public Etablissement() {}

	public Etablissement(Long id, String nom, List<Mastere> masteres) {
		super();
		this.id = id;
		this.nom = nom;
		this.masteres = masteres;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public List<Mastere> getMasteres() {
		return masteres;
	}

	public void setMasteres(List<Mastere> masteres) {
		this.masteres = masteres;
	}
	
	
	public void setMastere(Mastere mastere) {
		this.masteres.add(mastere);
	}
	
	public Mastere getMastere(Long id) {
		Mastere mastere = new Mastere();
		
		for(int i=0; i < this.masteres.size(); i++) {
			if(this.masteres.get(i).getId() == id) {
				//mastere.setEtablissement(this.masteres.get(i).getEtablissement() );
				mastere.setEtudiants(this.masteres.get(i).getEtudiants());
				mastere.setId( this.masteres.get(i).getId() );
				mastere.setLibele(this.masteres.get(i).getLibele() );
				mastere.setMention( this.masteres.get(i).getMention() );
				mastere.setType( this.masteres.get(i).getType() );
			}
		}
		
		return mastere;
	}

	public List<Diplome> getDiplomes() {
		return diplomes;
	}

	public void setDiplome( Diplome diplome ) {
		diplomes.add(diplome);
	}

	public void setDiplomes(List<Diplome> diplomes) {
		this.diplomes = diplomes;
	}
}
