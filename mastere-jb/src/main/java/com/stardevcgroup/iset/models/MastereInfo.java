package com.stardevcgroup.iset.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class MastereInfo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String titre;
	@Column
	@Type(type="text")
	private String description;
	@Column
	@Type(type="text")
	private String publicCible;
	@Column(length = 9000)
	@Type(type="text")
	private String objectif;
	@Column(length = 9000)
	@Type(type="text")
	private String secteur;
	@Column(length = 9000)
	@Type(type="text")
	private String metier;
	@Column(length = 9000)
	@Type(type="text")
	private String modalite;
}
