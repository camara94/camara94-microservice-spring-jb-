package com.stardevcgroup.iset.models;

import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;




/**
 * @author Laby D. Camara | ldamaro98@gmail.com
 * 
 * @since 0.0.1
 * @version 0.0.1
 */


@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class Diplome  implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String titre;
	private String annee;
	private String file;
	
	
	
	@OneToMany
	private List<AnneeUniversitaire> anneeUniversitaires = new ArrayList<AnneeUniversitaire>();
	/*@Column( nullable = true )
	private int nombreAnneeUniversitaire = this.anneeUniversitaires.size();*/
	
	@JsonBackReference
	@ManyToOne
	private Etudiant etudiant;
	
	
	
	
	public Diplome() {}
	
	

	public Diplome(Long id, String titre, String annee, String file, List<AnneeUniversitaire> anneeUniversitaires,
			Etudiant etudiant) {
		super();
		this.id = id;
		this.titre = titre;
		this.annee = annee;
		this.file = file;
		this.anneeUniversitaires = anneeUniversitaires;
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



	public List<AnneeUniversitaire> getAnneeUniversitaires() {
		return anneeUniversitaires;
	}



	public void setAnneeUniversitaires(List<AnneeUniversitaire> anneeUniversitaires) {
		this.anneeUniversitaires = anneeUniversitaires;
	}



	public Etudiant getEtudiant() {
		return etudiant;
	}



	public void setEtudiant(Etudiant etudiant) {
		this.etudiant = etudiant;
	}



	public AnneeUniversitaire getAnneeUniversitaire(Long id) {
		AnneeUniversitaire anneeUniversitaire = new AnneeUniversitaire();
		
		for(int i=0; i < this.anneeUniversitaires.size(); i++) {
			if(this.anneeUniversitaires.get(i).getId() == id) {
				anneeUniversitaire = this.anneeUniversitaires.get(i);
			}
		}
		
		return anneeUniversitaire;
	}
	
	public void setAnneeUniversitaire(AnneeUniversitaire anneeUniversitaire) {
		this.anneeUniversitaires.add(anneeUniversitaire);
	}
	
	public void removeAllReveles() {
		for(int i = 0; i < this.anneeUniversitaires.size(); i++) {
			this.anneeUniversitaires.remove(i);
		}
	}
	
	
	
}