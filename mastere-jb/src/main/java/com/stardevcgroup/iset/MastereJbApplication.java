package com.stardevcgroup.iset;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;


@EnableDiscoveryClient
@SpringBootApplication
public class MastereJbApplication {

	public static void main(String[] args) {
		SpringApplication.run(MastereJbApplication.class, args);
	}

}
