package com.stardevcgroup.iset.business;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.stardevcgroup.iset.models.MastereEtudiant;

import lombok.Builder;




public class DoublonAnnee {
	private List<MastereEtudiant>  mastereEtudiants;
	public DoublonAnnee() {}
	public DoublonAnnee(List<MastereEtudiant> mastereEtudiants) {
		this.mastereEtudiants = mastereEtudiants;
	}
	public List<String> anneeUnique() {
		// Créer un objet ArrayList
	    List<String> array_L = new ArrayList();
	    // Ajout des éléments avec doublon
	    for(int i = 0; i < this.mastereEtudiants.size(); i++) {	
	    	  array_L.add(this.mastereEtudiants.get(i).getAnneeUniversitaire() );
	    }
	    // Créer une liste de contenu unique basée sur les éléments de ArrayList
	    Set<String> mySet = new HashSet<String>(array_L);
	    // Créer une Nouvelle ArrayList à partir de Set
	    List<String> array_L2 = new ArrayList<String>(mySet);
	    List<Integer> liste = new ArrayList();
	    for(int i=0; i < array_L2.size(); i++)
	    {
	    	liste.add(Integer.valueOf(array_L2.get(i).substring(0, 4)).intValue());
	    }
	    
	    Collections.sort(liste);
	    
	    List<String> anneeTrier = new ArrayList<String>();
	    
	    
	    for(int i=0; i < liste.size(); i++)
	    {
	    	//System.out.println(liste);
	    	anneeTrier.add(liste.get(i) + "-" + (liste.get(i)+1));
	    }
	    // Afficher le contenu de ArrayList
	    return anneeTrier;
	}
	
	

}
