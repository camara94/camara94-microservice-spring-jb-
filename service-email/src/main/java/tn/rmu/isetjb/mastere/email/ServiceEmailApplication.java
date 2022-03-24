package tn.rmu.isetjb.mastere.email;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.ApplicationContext;

@EnableDiscoveryClient
@SpringBootApplication
public class ServiceEmailApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServiceEmailApplication.class, args);
	}

}
