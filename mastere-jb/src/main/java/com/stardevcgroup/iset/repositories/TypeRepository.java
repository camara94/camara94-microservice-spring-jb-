package com.stardevcgroup.iset.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stardevcgroup.iset.models.Type;




@Repository
public interface TypeRepository extends JpaRepository<Type, Long> {

	Type getTypeById(Long id);
	
}
