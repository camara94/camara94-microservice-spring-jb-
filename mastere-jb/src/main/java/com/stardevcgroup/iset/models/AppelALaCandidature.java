package com.stardevcgroup.iset.models;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
public class AppelALaCandidature implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue( strategy = GenerationType.AUTO )
	private Long id;
	private Long etablissementId;
	private Long mastereId;
	private Long disponible;
	private String anneeUniversitaire;

	AppelALaCandidature() {}

	public AppelALaCandidature(Long id, Long etablissementId, Long mastereId, Long disponible,
			String anneeUniversitaire) {
		super();
		this.id = id;
		this.etablissementId = etablissementId;
		this.mastereId = mastereId;
		this.disponible = disponible;
		this.anneeUniversitaire = anneeUniversitaire;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getEtablissementId() {
		return etablissementId;
	}

	public void setEtablissementId(Long etablissementId) {
		this.etablissementId = etablissementId;
	}

	public Long getMastereId() {
		return mastereId;
	}

	public void setMastereId(Long mastereId) {
		this.mastereId = mastereId;
	}

	public Long getDisponible() {
		return disponible;
	}

	public void setDisponible(Long disponible) {
		this.disponible = disponible;
	}

	public String getAnneeUniversitaire() {
		return anneeUniversitaire;
	}

	public void setAnneeUniversitaire(String anneeUniversitaire) {
		this.anneeUniversitaire = anneeUniversitaire;
	}
	
}
