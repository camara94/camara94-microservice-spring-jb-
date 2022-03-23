package com.stardevcgroup.iset.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Reponse {
	private Long id;
	private String titre;
	private String reponse;
}
