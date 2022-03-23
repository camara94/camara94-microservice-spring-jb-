package com.stardevcgroup.iset.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stardevcgroup.iset.models.Certificat;



public interface CertificatRepository extends JpaRepository<Certificat, Long> {
	public Certificat getCertificatById( Long id );
}
