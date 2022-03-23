package com.stardevcgroup.iset.configs;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
 
@Configuration

public class MvcConfig implements WebMvcConfigurer {
    public static String uploadDirectory= System.getProperty("user.home") + "\\dama\\microservice-spring-jb\\uploadedFiles";
 
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/dama/microservice-spring-jb/uploadedFiles/**").addResourceLocations("file:" + uploadDirectory+"\\");
    }
}