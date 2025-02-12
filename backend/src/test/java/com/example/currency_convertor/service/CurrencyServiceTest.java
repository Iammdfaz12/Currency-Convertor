package com.example.currency_convertor.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Map;

import org.junit.jupiter.api.Test;

import com.example.currency_convertor.exception.CurrencyException;

public class CurrencyServiceTest {

    private CurrencyService currencyService = new CurrencyService();

    @Test
    void testGetExchangeRates() {
        Map<String, Double> rates = currencyService.getExchangeRates("USD");
        assertNotNull(rates);
        assertTrue(rates.containsKey("EUR"));
    }

    @Test
    void testConvertCurrency() {
        double convertedAmount = currencyService.convertCurrency("USD", "EUR", 100);
        assertTrue(convertedAmount > 0);
    }

    @Test
    void testInvalidCurrencyCode() {
        assertThrows(CurrencyException.class, () -> currencyService.convertCurrency("USD", "XYZ", 100));
    }
}
