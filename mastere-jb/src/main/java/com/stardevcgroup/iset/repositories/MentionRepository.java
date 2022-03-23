package com.stardevcgroup.iset.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stardevcgroup.iset.models.Mention;



@Repository
public interface MentionRepository extends JpaRepository<Mention, Long> {

	Mention getMentionById(Long id);

}
