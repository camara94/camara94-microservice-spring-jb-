package com.stardevcgroup.iset.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stardevcgroup.iset.models.ChampFormule;



public interface ChampFormuleRepository extends JpaRepository<ChampFormule, Long> {
	public ChampFormule getChampFormuleById( Long id );
}
