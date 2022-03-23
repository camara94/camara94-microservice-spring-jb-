package com.stardevcgroup.iset.storages;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;


@Component
@ConfigurationProperties(prefix = "storage")
public class StorageProperties {

    private String location;

	public StorageProperties() {}

	public StorageProperties(String location) {
		super();
		this.location = location;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}
    
}