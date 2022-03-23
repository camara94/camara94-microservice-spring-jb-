package com.stardevcgroup.iset.models;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonBackReference;



@Entity
public class Formation implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue( strategy = GenerationType.AUTO )	
	private Long id;
	private String titre;
	private Long duree;
	private String typeDuree;
	private Date dateDebut;
	private Date dateFin;
	private String file;
	private String plateforme;
	@JsonBackReference
	private Etudiant etudiant;
	public Formation() {}
	public Formation(Long id, String titre, Long duree, String typeDuree, Date dateDebut, Date dateFin, String file,
			String plateforme, Etudiant etudiant) {
		super();
		this.id = id;
		this.titre = titre;
		this.duree = duree;
		this.typeDuree = typeDuree;
		this.dateDebut = dateDebut;
		this.dateFin = dateFin;
		this.file = file;
		this.plateforme = plateforme;
		this.etudiant = etudiant;
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
	public Long getDuree() {
		return duree;
	}
	public void setDuree(Long duree) {
		this.duree = duree;
	}
	public String getTypeDuree() {
		return typeDuree;
	}
	public void setTypeDuree(String typeDuree) {
		this.typeDuree = typeDuree;
	}
	public Date getDateDebut() {
		return dateDebut;
	}
	public void setDateDebut(Date dateDebut) {
		this.dateDebut = dateDebut;
	}
	public Date getDateFin() {
		return dateFin;
	}
	public void setDateFin(Date dateFin) {
		this.dateFin = dateFin;
	}
	public String getFile() {
		return file;
	}
	public void setFile(String file) {
		this.file = file;
	}
	public String getPlateforme() {
		return plateforme;
	}
	public void setPlateforme(String plateforme) {
		this.plateforme = plateforme;
	}
	public Etudiant getEtudiant() {
		return etudiant;
	}
	public void setEtudiant(Etudiant etudiant) {
		this.etudiant = etudiant;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	/*public String getFile(){
		GetFilePath f = new GetFilePath("uploads/", file);
		this.file = f.getFile();
		return this.file;
	}*/
}
