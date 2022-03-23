package com.stardevcgroup.iset.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stardevcgroup.iset.models.AnneeUniversitaire;



public interface AnneeUniversitaireRepository extends JpaRepository<AnneeUniversitaire, Long> {

	AnneeUniversitaire getAnneeUniversitaireById(Long id);

}
