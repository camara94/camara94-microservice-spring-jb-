package com.stardevcgroup.iset.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stardevcgroup.iset.models.Etablissement;


@Repository
public interface EtablissementRepository extends JpaRepository<Etablissement, Long> { 
	
	public Etablissement getEtablissementById( Long id );
}
