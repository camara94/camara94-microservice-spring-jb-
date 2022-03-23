package com.stardevcgroup.iset.jwt;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.stardevcgroup.iset.models.Etudiant;
import com.stardevcgroup.iset.repositories.EtudiantRepository;

@Service
public class JwtUserDetailsService implements UserDetailsService {
	
	@Value("${jwt.secret}")
	private String secret;
	
	@Autowired
	EtudiantRepository etudiantRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Etudiant etudiant = this.etudiantRepository.findByUsername(username);
		if (etudiant.getUsername() != null) {
			// Encodage du mot de passe de l'étudiant
			Map<String, PasswordEncoder> encoders = new HashMap<>();
	        encoders.put("bcrypt", new BCryptPasswordEncoder());
	        DelegatingPasswordEncoder passwordEncoder = new DelegatingPasswordEncoder("bcrypt", encoders);
	        passwordEncoder.setDefaultPasswordEncoderForMatches(new BCryptPasswordEncoder());
	        String password = passwordEncoder.encode(etudiant.getPassword());
	        
			return new User(etudiant.getUsername(), password.substring(8),
					new ArrayList<>());
		} else {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
	}
}