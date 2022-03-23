package com.stardevcgroup.iset.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stardevcgroup.iset.models.Mastere;



@Repository
public interface MastereRepository extends JpaRepository<Mastere, Long> {

	Mastere getMastereById(Long id);
	

}
