package com.example.dto; // O pacote deve bater com a pasta

import java.math.BigDecimal;

public class ProductionSuggestionDTO {
    public String productName;
    public Integer quantityPossible;
    public BigDecimal unitPrice;
    public BigDecimal totalValue;

    public ProductionSuggestionDTO(String productName, Integer quantityPossible, BigDecimal unitPrice) {
        this.productName = productName;
        this.quantityPossible = quantityPossible;
        this.unitPrice = unitPrice;
        // Calcula o valor total automaticamente
        this.totalValue = unitPrice.multiply(new BigDecimal(quantityPossible));
    }
}