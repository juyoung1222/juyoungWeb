package com.example1.practice1;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(value= {"com.example1.practice1.mapper"})
public class Exam4Application {

	public static void main(String[] args) {
		SpringApplication.run(Exam4Application.class, args);
	}

}
