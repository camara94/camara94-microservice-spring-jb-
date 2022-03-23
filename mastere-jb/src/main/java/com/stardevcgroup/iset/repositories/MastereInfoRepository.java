package com.stardevcgroup.iset.repositories;

import org.springframework.data.jpa.repository.JpaRepository;


import com.stardevcgroup.iset.models.MastereInfo;



public interface MastereInfoRepository extends JpaRepository<MastereInfo, Long> {
	public MastereInfo getMastereInfoById( Long id );
}
