package com.stardevcgroup.iset.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;



@Entity
public class Mastere implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String libele;
	private int disponible;
	@OneToOne
	private ChampFormule formule;
	@ManyToOne
	private Mention mention;
	@OneToOne
	private ChampFormule champFormule;
	@JsonManagedReference(value = "mastere")
	@OneToMany(
		        mappedBy = "mastere",
		        cascade = CascadeType.ALL,
		        orphanRemoval = true
		    )
	List<MastereEtudiant> etudiants = new ArrayList<MastereEtudiant>();
	/*@JsonBackReference(value = "m")
	@ManyToOne
	private Etablissement etablissement;*/
	@ManyToOne
	private Type type;
	
	
	public Mastere() {}
	
	
	
	public Mastere(Long id, String libele, int disponible, ChampFormule formule, Mention mention,
			ChampFormule champFormule, List<MastereEtudiant> etudiants, Type type) {
		super();
		this.id = id;
		this.libele = libele;
		this.disponible = disponible;
		this.formule = formule;
		this.mention = mention;
		this.champFormule = champFormule;
		this.etudiants = etudiants;
		this.type = type;
	}
	
	
	



	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getLibele() {
		return libele;
	}



	public void setLibele(String libele) {
		this.libele = libele;
	}



	public int getDisponible() {
		return disponible;
	}



	public void setDisponible(int disponible) {
		this.disponible = disponible;
	}



	public ChampFormule getFormule() {
		return formule;
	}



	public void setFormule(ChampFormule formule) {
		this.formule = formule;
	}



	public Mention getMention() {
		return mention;
	}



	public void setMention(Mention mention) {
		this.mention = mention;
	}



	public ChampFormule getChampFormule() {
		return champFormule;
	}



	public void setChampFormule(ChampFormule champFormule) {
		this.champFormule = champFormule;
	}



	public List<MastereEtudiant> getEtudiants() {
		return etudiants;
	}



	public void setEtudiants(List<MastereEtudiant> etudiants) {
		this.etudiants = etudiants;
	}



	public Type getType() {
		return type;
	}



	public void setType(Type type) {
		this.type = type;
	}



	public static long getSerialversionuid() {
		return serialVersionUID;
	}



	public MastereEtudiant getEtudiant(Long id) {
		Etudiant etudiant = new Etudiant();
		MastereEtudiant mastereEtudiant1 = new MastereEtudiant();
		etudiant.setId(id);
		 for (Iterator<MastereEtudiant> iterator = etudiants.iterator();
	             iterator.hasNext(); ) {
			 MastereEtudiant mastereEtudiant = iterator.next();
	 
	            if (mastereEtudiant.getMastere().equals(this) &&
	            		mastereEtudiant.getEtudiant().equals(etudiant)) {
	            	mastereEtudiant1 = mastereEtudiant; 
	            }
	        }
		return mastereEtudiant1;
	}
	public void addEtudiant(Etudiant etudiant ) {
        MastereEtudiant mastereEtudiant = new MastereEtudiant(this, etudiant);
        etudiants.add(mastereEtudiant);
    }
}