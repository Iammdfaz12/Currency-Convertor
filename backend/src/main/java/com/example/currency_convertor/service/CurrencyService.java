package com.example.currency_convertor.service;

import java.util.Map;
import java.util.stream.Collectors;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.currency_convertor.exception.CurrencyException;

@Service
public class CurrencyService {
    @Autowired
    private RestTemplate restTemplate;

    @Value("${exchange.api.url}")
    private static final String API_URL = "https://api.exchangerate-api.com/v4/latest/";

    public Map<String, Double> getExchangeRates(String baseCurrency) {
        String url = API_URL + baseCurrency;
        try {
            String response = restTemplate.getForObject(url, String.class);
            JSONObject jsonResponse = new JSONObject(response);
            Map<String, Object> rates = jsonResponse.getJSONObject("rates").toMap();
            return rates.entrySet().stream()
                    .collect(Collectors.toMap(Map.Entry::getKey, e -> ((Number) e.getValue()).doubleValue()));
        } catch (Exception e) {
            throw new CurrencyException("Failed to fetch exchange rates.");
        }
    }

    public double convertCurrency(String from, String to, double amount) {
        Map<String, Double> rates = getExchangeRates(from);
        if (!rates.containsKey(to)) {
            throw new CurrencyException("Invalid currency code: " + to);
        }
        return amount * rates.get(to);
    }
}
