package com.stardevcgroup.iset.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stardevcgroup.iset.models.Formation;



public interface FormationRepository extends JpaRepository<Formation, Long> {

	Formation getFormationById(Long id);

}
