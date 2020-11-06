package com.example1.practice1;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
@MapperScan(value = {"com.example1.practice1.mapper"})
public class Exam1Application {

	public static void main(String[] args) {
		SpringApplication.run(Exam1Application.class, args);
	}

}
