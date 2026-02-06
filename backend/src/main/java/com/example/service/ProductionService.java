package com.example.service;

import com.example.entity.Product;
import com.example.entity.ProductComponent;
import com.example.repository.ProductRepository;
import com.example.dto.ProductionSuggestionDTO;
import io.quarkus.panache.common.Sort;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.math.BigDecimal;
import java.math.RoundingMode; // Importação necessária para o novo padrão
import java.util.*;

@ApplicationScoped
public class ProductionService {

    @Inject
    ProductRepository productRepository;

    public List<ProductionSuggestionDTO> calculateProduction() {
        List<Product> products = productRepository.listAll(Sort.by("price").descending());
        
        Map<Long, BigDecimal> tempStock = new HashMap<>();
        List<ProductionSuggestionDTO> suggestions = new ArrayList<>();

        for (Product p : products) {
            if (p.getComponents() == null || p.getComponents().isEmpty()) continue;

            int maxPossibleForThisProduct = Integer.MAX_VALUE;

            for (ProductComponent comp : p.getComponents()) {
                Long matId = comp.getRawMaterial().getId();
                
                tempStock.putIfAbsent(matId, comp.getRawMaterial().getStockQuantity());
                
                BigDecimal available = tempStock.get(matId);
                BigDecimal required = comp.getRequiredQuantity();

                if (required != null && required.compareTo(BigDecimal.ZERO) > 0) {
                    // CORREÇÃO DOS WARNINGS:
                    // Usamos RoundingMode.DOWN no lugar de BigDecimal.ROUND_DOWN
                    int possible = available.divide(required, RoundingMode.DOWN).intValue();
                    
                    if (possible < maxPossibleForThisProduct) {
                        maxPossibleForThisProduct = possible;
                    }
                } else {
                    maxPossibleForThisProduct = 0;
                }
            }

            if (maxPossibleForThisProduct > 0 && maxPossibleForThisProduct != Integer.MAX_VALUE) {
                for (ProductComponent comp : p.getComponents()) {
                    Long matId = comp.getRawMaterial().getId();
                    BigDecimal totalConsumed = comp.getRequiredQuantity().multiply(new BigDecimal(maxPossibleForThisProduct));
                    BigDecimal newStock = tempStock.get(matId).subtract(totalConsumed);
                    tempStock.put(matId, newStock);
                }
                
                suggestions.add(new ProductionSuggestionDTO(
                    p.getName(), 
                    maxPossibleForThisProduct, 
                    p.getPrice()
                ));
            }
        }
        return suggestions;
    }
}