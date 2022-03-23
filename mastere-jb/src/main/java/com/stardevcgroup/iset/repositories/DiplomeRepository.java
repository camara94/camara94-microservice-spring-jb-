package com.stardevcgroup.iset.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.stardevcgroup.iset.models.Diplome;


public interface DiplomeRepository extends JpaRepository<Diplome, Long> {
	Diplome getDiplomesById(Long id);
	
	@Modifying
	 @Query("DELETE Diplome d WHERE d.id = ?1") 
	 void deleteByDiplomesId(Long diplomesId);
}
