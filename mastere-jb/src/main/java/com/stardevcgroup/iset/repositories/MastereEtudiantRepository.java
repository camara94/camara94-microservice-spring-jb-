package com.stardevcgroup.iset.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.stardevcgroup.iset.models.MastereEtudiant;
import com.stardevcgroup.iset.models.MastereEtudiantId;



public interface MastereEtudiantRepository extends JpaRepository<MastereEtudiant, MastereEtudiantId> {
	//public MastereEtudiant getMastereEtudiantById(Long id);
	public List<MastereEtudiant> getMastereEtudiantByAnneeUniversitaire( String anneeUniversitaire );
	
	@Query(
			  value = "SELECT me FROM MastereEtudiant me", 
			  nativeQuery = true)
	List<MastereEtudiant> chercher();
	
	List<MastereEtudiant> getMastereEtudiantByMastereIdAndAnneeUniversitaire(Long mastereId, String anneeUniversitaire);

	MastereEtudiant getMastereEtudiantById( MastereEtudiantId id );
	
}
