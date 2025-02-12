package com.example.currency_convertor.controller;


import com.example.currency_convertor.service.CurrencyService;
import com.example.currency_convertor.exception.CurrencyException;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:5173") // Allow React frontend
@RestController
@RequestMapping("/currency_convertor")
public class CurrencyController {

    @Autowired
    private CurrencyService currencyService;

    // GET /api/rates?base=USD
    @GetMapping("/rates")
    public Map<String, Double> getRates(@RequestParam(defaultValue = "USD") String base) {
        return currencyService.getExchangeRates(base);
    }

    // POST /api/convert
    @PostMapping("/convert")
    public Map<String, Object> convertCurrency(@RequestBody Map<String, Object> request) {
        String from = request.get("from").toString();
        String to = request.get("to").toString();
        double amount = Double.parseDouble(request.get("amount").toString());

        double convertedAmount = currencyService.convertCurrency(from, to, amount);

        return Map.of(
            "from", from,
            "to", to,
            "amount", amount,
            "convertedAmount", convertedAmount
        );
    }
}
