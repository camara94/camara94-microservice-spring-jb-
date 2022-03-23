package com.stardevcgroup.iset.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stardevcgroup.iset.models.StageExperience;



public interface StageExperienceRepository extends JpaRepository<StageExperience, Long> {
	public StageExperience getStageExperienceById( Long id );
}
