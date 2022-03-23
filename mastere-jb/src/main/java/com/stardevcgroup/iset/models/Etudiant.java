package com.stardevcgroup.iset.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.ForeignKey;
import org.hibernate.annotations.NaturalIdCache;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;


@Entity
public class Etudiant implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String email;
	private String nom;
	private String prenom;
	private String password;
	private String username;
	private String telephone;
	private String cin;
	private boolean validerDossier = false; 
	private double scoreOral = 0d;
	@OneToOne
	private Bac bac;
	
	@JsonManagedReference
	@OneToMany
	private List<Diplome> diplomes = new ArrayList<Diplome>();
	@JsonManagedReference
	@OneToMany
	private List<Formation> formations = new ArrayList<Formation>();
	@JsonManagedReference(value = "etudiant")
	@OneToMany(
			mappedBy = "etudiant",
			cascade = CascadeType.ALL,
			orphanRemoval = true
			)
	List<MastereEtudiant> masteres = new ArrayList<MastereEtudiant>();
	@JsonManagedReference
	@OneToMany
	private List<Distinction> distinctions = new ArrayList<Distinction>();
	
	@JsonManagedReference
	@OneToMany
	private List<Certificat> certificats = new ArrayList<Certificat>();
	@JsonManagedReference
	@OneToMany
	private List<StageExperience> stageExperiences = new ArrayList<StageExperience>();
	@JsonManagedReference
	@OneToMany
	private List<Notification> notifications = new ArrayList<Notification>();
	
	
	

	public Etudiant() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getEmail() {
		return email;
	}



	public void setEmail(String email) {
		this.email = email;
	}



	public String getNom() {
		return nom;
	}



	public void setNom(String nom) {
		this.nom = nom;
	}



	public String getPrenom() {
		return prenom;
	}



	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}



	public String getPassword() {
		return password;
	}



	public void setPassword(String password) {
		this.password = password;
	}



	public String getUsername() {
		return username;
	}



	public void setUsername(String username) {
		this.username = username;
	}



	public String getTelephone() {
		return telephone;
	}



	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}



	public String getCin() {
		return cin;
	}



	public void setCin(String cin) {
		this.cin = cin;
	}



	public Etudiant(Long id, String email, String nom, String prenom, String password, String username,
			String telephone, String cin, boolean validerDossier, double scoreOral, Bac bac, List<Diplome> diplomes,
			List<Formation> formations, List<MastereEtudiant> masteres, List<Distinction> distinctions,
			List<Certificat> certificats, List<StageExperience> stageExperiences, List<Notification> notifications) {
		super();
		this.id = id;
		this.email = email;
		this.nom = nom;
		this.prenom = prenom;
		this.password = password;
		this.username = username;
		this.telephone = telephone;
		this.cin = cin;
		this.validerDossier = validerDossier;
		this.scoreOral = scoreOral;
		this.bac = bac;
		this.diplomes = diplomes;
		this.formations = formations;
		this.masteres = masteres;
		this.distinctions = distinctions;
		this.certificats = certificats;
		this.stageExperiences = stageExperiences;
		this.notifications = notifications;
	}



	public Diplome getDiplome(Long id) {
		Diplome diplome = new Diplome();

		for(int i=0; i < this.diplomes.size(); i++) {
			if(this.diplomes.get(i).getId() == id) {
				diplome = this.diplomes.get(i);
			}
		}

		return diplome;
	}
	
	

	public void setDiplome(Diplome diplome) {
		this.diplomes.add(diplome);
	}

	public Formation getFormation(Long id) {
		Formation formation = new Formation();

		for(int i=0; i < this.formations.size(); i++) {
			if(this.formations.get(i).getId() == id) {
				formation = this.formations.get(i);
			}
		}

		return formation;
	}
	public void setFormation(Formation formation) {
		this.formations.add(formation);
	}
	public void addCertificat(Certificat certificat) {
		this.certificats.add(certificat);
	}
	
	
	
	
	public Notification getNotification(Long id) {
		Notification notification = new Notification();

		for(int i=0; i < this.notifications.size(); i++) {
			if(this.notifications.get(i).getId() == id) {
				notification = this.notifications.get(i);
			}
		}

		return notification;
	}
	public void setNotification(Notification notification) {
		this.notifications.add(notification);
	}
	public void addNotification(Notification notification) {
		this.notifications.add(notification);
	}
	
	
	public List<MastereEtudiant> getMasteres() {
		return masteres;
	}


	public void setMasteres(List<MastereEtudiant> masteres) {
		this.masteres = masteres;
	}

	public void addMastere(Mastere mastere) {
		MastereEtudiant mastereEtudiant = new MastereEtudiant(this, mastere);
		masteres.add(mastereEtudiant);
		mastere.getEtudiants().add(mastereEtudiant);
	}


	public Bac getBac() {
		return bac;
	}

	public void setBac(Bac bac) {
		this.bac = bac;
	}


	public void addStageExperiences(StageExperience stageExperience) {
		this.stageExperiences.add(stageExperience);
	}


	public boolean isValiderDossier() {
		return validerDossier;
	}

	public void setValiderDossier(boolean validerDossier) {
		this.validerDossier = validerDossier;
	}

	public double getScoreOral() {
		return scoreOral;
	}

	public void setScoreOral(double scoreOral) {
		this.scoreOral = scoreOral;
	}

	public List<Diplome> getDiplomes() {
		return diplomes;
	}

	public void setDiplomes(List<Diplome> diplomes) {
		this.diplomes = diplomes;
	}

	public List<Formation> getFormations() {
		return formations;
	}

	public void setFormations(List<Formation> formations) {
		this.formations = formations;
	}

	public List<Distinction> getDistinctions() {
		return distinctions;
	}

	public void setDistinctions(List<Distinction> distinctions) {
		this.distinctions = distinctions;
	}

	public List<Certificat> getCertificats() {
		return certificats;
	}

	public void setCertificats(List<Certificat> certificats) {
		this.certificats = certificats;
	}

	public List<StageExperience> getStageExperiences() {
		return stageExperiences;
	}

	public void setStageExperiences(List<StageExperience> stageExperiences) {
		this.stageExperiences = stageExperiences;
	}

	public List<Notification> getNotifications() {
		return notifications;
	}

	public void setNotifications(List<Notification> notifications) {
		this.notifications = notifications;
	}
	
	
}