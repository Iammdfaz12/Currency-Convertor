package com.example.currency_convertor.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;

public class ApiConfig {
     @Value("${exchange.api.url}")
    private String apiUrl;
    
    @Value("${exchange.api.key}")
    private String apiKey;

    public String getExchangeRatesUrl(String baseCurrency) {
        return apiUrl + "?base=" + baseCurrency + "&apikey=" + apiKey;
    }

    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
