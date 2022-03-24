package com.stardevcgroup.iset.jwt;


import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.stardevcgroup.iset.models.Etudiant;
import com.stardevcgroup.iset.repositories.EtudiantRepository;

@Service
public class JwtUserDetailsService implements UserDetailsService {
	
	@Autowired
	private EtudiantRepository etudiantRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Etudiant etudiant = etudiantRepository.findByUsername(username);
		
		if (etudiant.getUsername() != null) {
			BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
			String password = etudiant.getPassword();
			String encodedPassword = passwordEncoder.encode(password);
			System.out.println("=================================================  "+encodedPassword+"       ================================================================");
			return new User(etudiant.getUsername(), encodedPassword, new ArrayList<>());
		} else {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
	}

}