package com.stardevcgroup.iset.models;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class StageExperience implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String titre;
	private String duree;
	private String nature;
	private String organisme;
	private String remarque;
	private String file;
	@JsonBackReference
	@ManyToOne
	private Etudiant etudiant;
	
	public String getFile(){
		/*GetFilePath f = new GetFilePath("uploads/", file);
		this.file = f.getFile();*/
		return this.file;
	}

}
