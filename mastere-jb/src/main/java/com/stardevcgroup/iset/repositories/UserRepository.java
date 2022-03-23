package com.stardevcgroup.iset.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stardevcgroup.iset.models.User;


public interface UserRepository extends JpaRepository<User, Long> {
	public User getUserById( Long id );
}
