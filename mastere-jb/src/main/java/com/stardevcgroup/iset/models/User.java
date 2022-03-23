package com.stardevcgroup.iset.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class User implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String nom;
	private String prenom;
	private String cin;
	private String email;
	private String telephone;
	private String password;
	private String login;

	@OneToOne
	private Bac bac;
	@OneToMany
	private List<Diplome> diplomes = new ArrayList<Diplome>();
	/*@JsonManagedReference
	@OneToMany
	private List<Formation> formations = new ArrayList<Formation>();
	/*@JsonManagedReference(value = "mastere")
	@OneToMany
	List<MastereEtudiant> masteres = new ArrayList<MastereEtudiant>();
	@JsonManagedReference
	@OneToMany
	private List<Distinction> distinctions = new ArrayList<Distinction>();
	
	@JsonManagedReference
	@OneToMany
	private List<Certificat> certificats = new ArrayList<Certificat>();
	@JsonManagedReference
	@OneToMany
	private List<StageExperience> stageExperiences = new ArrayList<StageExperience>();*/
}
