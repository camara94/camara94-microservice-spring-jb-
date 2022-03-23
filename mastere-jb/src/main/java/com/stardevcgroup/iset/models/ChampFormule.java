package com.stardevcgroup.iset.models;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
public class ChampFormule implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private double coefficientBac;
	private double mentionBac;
	private double coefficientAnneeUniversitaire;
	private double coefficientMentionABien;
	private double coefficientDistinction;
	private double coefficientMentionBien;
	private double coefficientMentionTBien;
	private double coefficientSessionPrincipale;
	private double coefficientRedouble;
	private double coefficientFormation;
	private double coefficientStage;
	private double coefficientExperience;
	private double coefficientCertificat;
	private double coefficientAnneeSupplementaire;
	private int nombreLimiteDeCertificat;
	private int nombreLimiteDeFormation;
	private int nombreLimiteDeStage;
	private int nombreLimiteDExperience;
	private int nombreDeRedoublementMax;
	
	public ChampFormule() {}

	public ChampFormule(Long id, double coefficientBac, double mentionBac, double coefficientAnneeUniversitaire,
			double coefficientMentionABien, double coefficientDistinction, double coefficientMentionBien,
			double coefficientMentionTBien, double coefficientSessionPrincipale, double coefficientRedouble,
			double coefficientFormation, double coefficientStage, double coefficientExperience,
			double coefficientCertificat, double coefficientAnneeSupplementaire, int nombreLimiteDeCertificat,
			int nombreLimiteDeFormation, int nombreLimiteDeStage, int nombreLimiteDExperience,
			int nombreDeRedoublementMax) {
		super();
		this.id = id;
		this.coefficientBac = coefficientBac;
		this.mentionBac = mentionBac;
		this.coefficientAnneeUniversitaire = coefficientAnneeUniversitaire;
		this.coefficientMentionABien = coefficientMentionABien;
		this.coefficientDistinction = coefficientDistinction;
		this.coefficientMentionBien = coefficientMentionBien;
		this.coefficientMentionTBien = coefficientMentionTBien;
		this.coefficientSessionPrincipale = coefficientSessionPrincipale;
		this.coefficientRedouble = coefficientRedouble;
		this.coefficientFormation = coefficientFormation;
		this.coefficientStage = coefficientStage;
		this.coefficientExperience = coefficientExperience;
		this.coefficientCertificat = coefficientCertificat;
		this.coefficientAnneeSupplementaire = coefficientAnneeSupplementaire;
		this.nombreLimiteDeCertificat = nombreLimiteDeCertificat;
		this.nombreLimiteDeFormation = nombreLimiteDeFormation;
		this.nombreLimiteDeStage = nombreLimiteDeStage;
		this.nombreLimiteDExperience = nombreLimiteDExperience;
		this.nombreDeRedoublementMax = nombreDeRedoublementMax;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public double getCoefficientBac() {
		return coefficientBac;
	}

	public void setCoefficientBac(double coefficientBac) {
		this.coefficientBac = coefficientBac;
	}

	public double getMentionBac() {
		return mentionBac;
	}

	public void setMentionBac(double mentionBac) {
		this.mentionBac = mentionBac;
	}

	public double getCoefficientAnneeUniversitaire() {
		return coefficientAnneeUniversitaire;
	}

	public void setCoefficientAnneeUniversitaire(double coefficientAnneeUniversitaire) {
		this.coefficientAnneeUniversitaire = coefficientAnneeUniversitaire;
	}

	public double getCoefficientMentionABien() {
		return coefficientMentionABien;
	}

	public void setCoefficientMentionABien(double coefficientMentionABien) {
		this.coefficientMentionABien = coefficientMentionABien;
	}

	public double getCoefficientDistinction() {
		return coefficientDistinction;
	}

	public void setCoefficientDistinction(double coefficientDistinction) {
		this.coefficientDistinction = coefficientDistinction;
	}

	public double getCoefficientMentionBien() {
		return coefficientMentionBien;
	}

	public void setCoefficientMentionBien(double coefficientMentionBien) {
		this.coefficientMentionBien = coefficientMentionBien;
	}

	public double getCoefficientMentionTBien() {
		return coefficientMentionTBien;
	}

	public void setCoefficientMentionTBien(double coefficientMentionTBien) {
		this.coefficientMentionTBien = coefficientMentionTBien;
	}

	public double getCoefficientSessionPrincipale() {
		return coefficientSessionPrincipale;
	}

	public void setCoefficientSessionPrincipale(double coefficientSessionPrincipale) {
		this.coefficientSessionPrincipale = coefficientSessionPrincipale;
	}

	public double getCoefficientRedouble() {
		return coefficientRedouble;
	}

	public void setCoefficientRedouble(double coefficientRedouble) {
		this.coefficientRedouble = coefficientRedouble;
	}

	public double getCoefficientFormation() {
		return coefficientFormation;
	}

	public void setCoefficientFormation(double coefficientFormation) {
		this.coefficientFormation = coefficientFormation;
	}

	public double getCoefficientStage() {
		return coefficientStage;
	}

	public void setCoefficientStage(double coefficientStage) {
		this.coefficientStage = coefficientStage;
	}

	public double getCoefficientExperience() {
		return coefficientExperience;
	}

	public void setCoefficientExperience(double coefficientExperience) {
		this.coefficientExperience = coefficientExperience;
	}

	public double getCoefficientCertificat() {
		return coefficientCertificat;
	}

	public void setCoefficientCertificat(double coefficientCertificat) {
		this.coefficientCertificat = coefficientCertificat;
	}

	public double getCoefficientAnneeSupplementaire() {
		return coefficientAnneeSupplementaire;
	}

	public void setCoefficientAnneeSupplementaire(double coefficientAnneeSupplementaire) {
		this.coefficientAnneeSupplementaire = coefficientAnneeSupplementaire;
	}

	public int getNombreLimiteDeCertificat() {
		return nombreLimiteDeCertificat;
	}

	public void setNombreLimiteDeCertificat(int nombreLimiteDeCertificat) {
		this.nombreLimiteDeCertificat = nombreLimiteDeCertificat;
	}

	public int getNombreLimiteDeFormation() {
		return nombreLimiteDeFormation;
	}

	public void setNombreLimiteDeFormation(int nombreLimiteDeFormation) {
		this.nombreLimiteDeFormation = nombreLimiteDeFormation;
	}

	public int getNombreLimiteDeStage() {
		return nombreLimiteDeStage;
	}

	public void setNombreLimiteDeStage(int nombreLimiteDeStage) {
		this.nombreLimiteDeStage = nombreLimiteDeStage;
	}

	public int getNombreLimiteDExperience() {
		return nombreLimiteDExperience;
	}

	public void setNombreLimiteDExperience(int nombreLimiteDExperience) {
		this.nombreLimiteDExperience = nombreLimiteDExperience;
	}

	public int getNombreDeRedoublementMax() {
		return nombreDeRedoublementMax;
	}

	public void setNombreDeRedoublementMax(int nombreDeRedoublementMax) {
		this.nombreDeRedoublementMax = nombreDeRedoublementMax;
	}
	
}
