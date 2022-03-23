package com.stardevcgroup.iset.models;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity(name = "MastereEtudiant")
@Table(name = "mastere_etudiant")

public class MastereEtudiant implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private MastereEtudiantId id;
	
	@JsonBackReference(value = "mastere")
	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("mastereId")
	private Mastere mastere;
	
	@JsonBackReference(value = "etudiant")
	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("etudiantId")
	private Etudiant etudiant;

	@Column(name = "annee_universitaire")
	private String anneeUniversitaire = "2020-2021";//new Date().toGMTString().substring(6, 10) + "-" +  (Integer.valueOf(new Date().toGMTString().substring(6, 10)).intValue() + 1);

	private double score=0;
	
	
	
	
	public MastereEtudiant() {
	}

	public MastereEtudiant(@JsonProperty("mastere") Mastere mastere, @JsonProperty("etudiant") Etudiant etudiant) {
		this.mastere = mastere;
		this.etudiant = etudiant;
		this.id = new MastereEtudiantId(mastere.getId(), etudiant.getId());
	}
	
	
	public MastereEtudiant(@JsonProperty("etudiant") Etudiant etudiant, @JsonProperty("mastere") Mastere mastere) {
		this.mastere = mastere;
		this.etudiant = etudiant;
		this.id = new MastereEtudiantId(mastere.getId(), etudiant.getId());
	}
	
	
	

	//Getters and setters omitted for brevity

	public MastereEtudiantId getId() {
		return id;
	}

	public void setId(MastereEtudiantId id) {
		this.id = id;
	}

	
	public Mastere getMastere() {
		return mastere;
	}

	public void setMastere(Mastere mastere) {
		this.mastere = mastere;
	}

	public Etudiant getEtudiant() {
		return etudiant;
	}

	public void setEtudiant(Etudiant etudiant) {
		this.etudiant = etudiant;
	}

	public String getAnneeUniversitaire() {
		return anneeUniversitaire;
	}

	public void setAnneeAniversitaire(String anneeUniversitaire) {
		this.anneeUniversitaire = anneeUniversitaire;
	}
	
	
	

	public double getScore() {
		return score;
	}

	public void setScore(double score) {
		this.score = Double.valueOf(Math.round(score*100)).doubleValue()/100;
	}

	public void setAnneeUniversitaire(String anneeUniversitaire) {
		this.anneeUniversitaire = anneeUniversitaire;
	}


	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
 
        if (o == null || getClass() != o.getClass())
            return false;
 
        MastereEtudiant that = (MastereEtudiant) o;
        return Objects.equals(mastere, that.mastere) &&
               Objects.equals(etudiant, that.etudiant);
    }
	
	

	@Override
    public int hashCode() {
        return Objects.hash(mastere, etudiant);
    }
}
