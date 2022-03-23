package com.stardevcgroup.iset.repositories;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;


import com.stardevcgroup.iset.models.Etudiant;


@Repository
@CrossOrigin("*")
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {

	public Etudiant getEtudiantById(Long id);
	
	public Etudiant findByUsername( String USERNAME );
	
	@Modifying
	 @Query("DELETE Diplome d WHERE d.id = ?1") 
	 void deleteByDiplomesId(Long diplomesId);
	
}
