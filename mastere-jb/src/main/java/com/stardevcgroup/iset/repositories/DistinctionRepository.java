package com.stardevcgroup.iset.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stardevcgroup.iset.models.Distinction;



public interface DistinctionRepository extends JpaRepository<Distinction, Long> {
	public Distinction getDistinctionById( Long id );
}
