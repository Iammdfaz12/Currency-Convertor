package com.example.currency_convertor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


@SpringBootApplication
@RestController
public class CurrencyConvertorApplication {
	@Value("${frontend.url}")
	@CrossOrigin(origins = "http://localhost:5173")
	public static void main(String[] args) {
		SpringApplication.run(CurrencyConvertorApplication.class, args);
	}

	@Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
	
}
