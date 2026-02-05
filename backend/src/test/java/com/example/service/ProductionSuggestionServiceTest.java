package com.example.service;

import com.example.resource.Product;
import com.example.resource.ProductComponent;
import com.example.resource.RawMaterial;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class ProductionSuggestionServiceTest {

    private final ProductionSuggestionService service =
            new ProductionSuggestionService();

    @Test
    void shouldSuggestProductionByHighestPrice() {

        // Raw materials
        RawMaterial steel = new RawMaterial(1L, "Steel", 10);
        RawMaterial plastic = new RawMaterial(2L, "Plastic", 10);

        // Products
        Product cheapProduct = new Product(1L, "Cheap", 10.0);
        Product expensiveProduct = new Product(2L, "Expensive", 50.0);

        // Components
        cheapProduct.setComponents(List.of(
                new ProductComponent(steel, cheapProduct, 2)
        ));

        expensiveProduct.setComponents(List.of(
                new ProductComponent(steel, expensiveProduct, 5)
        ));

        // Execute
        Map<Product, Integer> result = service.suggestProduction(
                List.of(cheapProduct, expensiveProduct),
                List.of(steel, plastic)
        );

        // Assert
        assertEquals(1, result.size());
        assertTrue(result.containsKey(expensiveProduct));
        assertEquals(2, result.get(expensiveProduct));
    }
}
