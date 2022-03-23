package com.stardevcgroup.iset.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stardevcgroup.iset.models.AppelALaCandidature;


public interface AppelALaCandidatureRepository extends JpaRepository<AppelALaCandidature, Long> {
	
	public AppelALaCandidature getAppelALaCandidatureById( Long id );
}
