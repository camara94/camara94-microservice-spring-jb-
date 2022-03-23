package com.stardevcgroup.iset.models;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Laby D. Camara | ldamaro98@gmail.com
 * 
 * @since 0.0.1
 * @version 0.0.1
 */


@Entity
public class AnneeUniversitaire implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String titre;
	private double moyenne;
	private String annee;
	private String file;
	private String session;
	
	@JsonBackReference
	@ManyToOne(fetch = FetchType.EAGER) //, cascade = {PERSIST, MERGE, REFRESH, DETACH},
	private Diplome diplome;

	public AnneeUniversitaire() {}

	public AnneeUniversitaire(Long id, String titre, double moyenne, String annee, String file, String session,
			Diplome diplome) {
		super();
		this.id = id;
		this.titre = titre;
		this.moyenne = moyenne;
		this.annee = annee;
		this.file = file;
		this.session = session;
		this.diplome = diplome;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitre() {
		return titre;
	}

	public void setTitre(String titre) {
		this.titre = titre;
	}

	public double getMoyenne() {
		return moyenne;
	}

	public void setMoyenne(double moyenne) {
		this.moyenne = moyenne;
	}

	public String getAnnee() {
		return annee;
	}

	public void setAnnee(String annee) {
		this.annee = annee;
	}

	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}

	public String getSession() {
		return session;
	}

	public void setSession(String session) {
		this.session = session;
	}

	public Diplome getDiplome() {
		return diplome;
	}

	public void setDiplome(Diplome diplome) {
		this.diplome = diplome;
	}
	
	
}