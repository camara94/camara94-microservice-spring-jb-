package com.stardevcgroup.iset.models;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.GenericGenerator;


@Entity
public class Mention implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GenericGenerator(name="kaugen" , strategy="increment")
	@GeneratedValue(generator="kaugen")
	@Column(name="id")
	private Long id;
	private String nom;
	@OneToMany
	List<Mastere> mastere;
	@ManyToOne
	private Domaine domaine;
	
	public Mention() {}

	public Mention(Long id, String nom, List<Mastere> mastere, Domaine domaine) {
		super();
		this.id = id;
		this.nom = nom;
		this.mastere = mastere;
		this.domaine = domaine;
	}
	
	public Mention(Long id, String nom,  Domaine domaine) {
		super();
		this.id = id;
		this.nom = nom;
		this.domaine = domaine;
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

	public List<Mastere> getMastere() {
		return mastere;
	}

	public void setMastere(List<Mastere> mastere) {
		this.mastere = mastere;
	}

	public Domaine getDomaine() {
		return domaine;
	}

	public void setDomaine(Domaine domaine) {
		this.domaine = domaine;
	}

}
