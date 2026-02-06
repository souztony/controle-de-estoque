package com.example.service;

import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;
import java.math.BigDecimal;

@QuarkusTest
public class ProductionServiceTest {

    @Inject
    ProductionService productionService;

    @Test
    @DisplayName("Should calculate production suggestions without errors")
    public void testCalculateProduction() {
        var suggestions = productionService.calculateProduction();
        
        assertNotNull(suggestions, "A lista de sugestões não deve ser nula");
        
        suggestions.forEach(s -> {
            assertNotNull(s.getProductName(), "O nome do produto não deve ser nulo");
            assertTrue(s.getQuantity() >= 0, "A quantidade deve ser zero ou maior");
            
            // Verifica se o cálculo do preço total está correto: unitPrice * quantity
            BigDecimal expectedTotal = s.getUnitPrice().multiply(new BigDecimal(s.getQuantity()));
            assertEquals(expectedTotal, s.getTotalPrice(), "O preço total deve ser unitário * quantidade");
        });
    }
}