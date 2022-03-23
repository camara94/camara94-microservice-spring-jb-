package com.stardevcgroup.iset.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stardevcgroup.iset.models.Domaine;



@Repository
public interface DomaineRepository extends JpaRepository<Domaine, Long> {

	public Domaine getDomaineById( Long id );

}
