package com.stardevcgroup.iset.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stardevcgroup.iset.models.Bac;

public interface BacRepository extends JpaRepository<Bac, Long> {
	public Bac getBacById( Long id );
}
