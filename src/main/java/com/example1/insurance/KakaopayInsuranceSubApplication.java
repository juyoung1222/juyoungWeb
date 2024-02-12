package com.example1.insurance;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@SpringBootApplication
@MapperScan(value= {"com.example1.insurance.mapper"})
public class KakaopayInsuranceSubApplication {
	 @Bean
     public InternalResourceViewResolver setupViewResolver() {
     
            InternalResourceViewResolver resolver = new InternalResourceViewResolver();
     
            resolver.setPrefix("/WEB-INF/views/");
            resolver.setSuffix(".jsp");
            return resolver;
	 }
	public static void main(String[] args) {
		SpringApplication.run(KakaopayInsuranceSubApplication.class, args);
	}

}
