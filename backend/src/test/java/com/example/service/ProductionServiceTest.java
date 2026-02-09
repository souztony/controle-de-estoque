package com.example.service;

import com.example.entity.Product;
import com.example.entity.ProductComponent;
import com.example.entity.RawMaterial;
import com.example.repository.ProductComponentRepository;
import com.example.repository.ProductRepository;
import com.example.repository.RawMaterialRepository;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;
import java.math.BigDecimal;

@QuarkusTest
public class ProductionServiceTest {

    @Inject
    ProductionService productionService;

    @Inject
    ProductRepository productRepository;

    @Inject
    RawMaterialRepository rawMaterialRepository;

    @Inject
    ProductComponentRepository productComponentRepository;

    @BeforeEach
    @Transactional
    void setup() {
        productComponentRepository.deleteAll();
        productRepository.deleteAll();
        rawMaterialRepository.deleteAll();
    }

    @Test
    @DisplayName("Should prioritize production of higher value products when resources are limited")
    @Transactional
    public void testProductionPrioritization() {
        // 1. Create a raw material with limited stock
        RawMaterial wood = new RawMaterial();
        wood.setCode("WOOD");
        wood.setName("Wood");
        wood.setStockQuantity(new BigDecimal("10")); // Only 10 units available
        rawMaterialRepository.persist(wood);

        // 2. Create an expensive product (Priority 1)
        Product luxuryChair = new Product();
        luxuryChair.setCode("LCH-01");
        luxuryChair.setName("Luxury Chair");
        luxuryChair.setPrice(new BigDecimal("500.00"));
        productRepository.persist(luxuryChair);

        ProductComponent comp1 = new ProductComponent();
        comp1.setProduct(luxuryChair);
        comp1.setRawMaterial(wood);
        comp1.setRequiredQuantity(new BigDecimal("10")); // Takes everything
        productComponentRepository.persist(comp1);
        luxuryChair.getComponents().add(comp1);

        // 3. Create a cheap product (Priority 2)
        Product simpleChair = new Product();
        simpleChair.setCode("SCH-01");
        simpleChair.setName("Simple Chair");
        simpleChair.setPrice(new BigDecimal("100.00"));
        productRepository.persist(simpleChair);

        ProductComponent comp2 = new ProductComponent();
        comp2.setProduct(simpleChair);
        comp2.setRawMaterial(wood);
        comp2.setRequiredQuantity(new BigDecimal("5")); // Needs 5
        productComponentRepository.persist(comp2);
        simpleChair.getComponents().add(comp2);

        // 4. Calculate production
        var suggestions = productionService.calculateProduction();

        // 5. Assertions
        assertNotNull(suggestions);
        assertFalse(suggestions.isEmpty());
        
        // The luxury chair should be produced (1 unit)
        // The simple chair should NOT be produced because the luxury chair took all the wood
        assertEquals(1, suggestions.size(), "Only one product should be suggested due to limited stock");
        assertEquals("Luxury Chair", suggestions.get(0).getProductName());
        assertEquals(1, suggestions.get(0).getQuantity());
    }

    @Test
    @DisplayName("Should return multiple suggestions when stock allows")
    @Transactional
    public void testMultipleSuggestions() {
        RawMaterial iron = new RawMaterial();
        iron.setCode("IRON");
        iron.setName("Raw Iron");
        iron.setStockQuantity(new BigDecimal("100"));
        rawMaterialRepository.persist(iron);

        Product table = new Product();
        table.setCode("TBL-01");
        table.setName("Metal Table");
        table.setPrice(new BigDecimal("200.00"));
        productRepository.persist(table);

        ProductComponent c1 = new ProductComponent();
        c1.setProduct(table);
        c1.setRawMaterial(iron);
        c1.setRequiredQuantity(new BigDecimal("10"));
        productComponentRepository.persist(c1);
        table.getComponents().add(c1);

        var suggestions = productionService.calculateProduction();
        
        assertTrue(suggestions.size() > 0);
        assertEquals("Metal Table", suggestions.get(0).getProductName());
        assertEquals(10, suggestions.get(0).getQuantity()); // 100 / 10 = 10
    }
}