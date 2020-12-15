package com.example1.practice1;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@MapperScan(value= {"com.example1.practice1.mapper"})
@MapperScan(value= {"com.example1.practice1.admin.mapper"})
@ComponentScan(basePackages= {"websocket", "com.example1.practice1"})
public class Exam4Application {

	public static void main(String[] args) {
		SpringApplication.run(Exam4Application.class, args);
	}

}
