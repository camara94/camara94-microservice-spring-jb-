package com.stardevcgroup.iset.models;


import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;



/**
 * @author Laby D. Camara | ldamaro98@gmail.com
 * 
 * @since 0.0.1
 * @version 0.0.1
 */


@Entity
public class Bac implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String option;
	private String annee;
	private String ecole;
	private double moyenne;
	private String file;
	
	public Bac() {}

	public Bac(Long id, String option, String annee, String ecole, double moyenne, String file) {
		super();
		this.id = id;
		this.option = option;
		this.annee = annee;
		this.ecole = ecole;
		this.moyenne = moyenne;
		this.file = file;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getOption() {
		return option;
	}

	public void setOption(String option) {
		this.option = option;
	}

	public String getAnnee() {
		return annee;
	}

	public void setAnnee(String annee) {
		this.annee = annee;
	}

	public String getEcole() {
		return ecole;
	}

	public void setEcole(String ecole) {
		this.ecole = ecole;
	}

	public double getMoyenne() {
		return moyenne;
	}

	public void setMoyenne(double moyenne) {
		this.moyenne = moyenne;
	}

	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}
	
	
}
