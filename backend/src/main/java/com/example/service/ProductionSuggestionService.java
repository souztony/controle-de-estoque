package com.example.service;

import com.example.resource.Product;
import com.example.resource.ProductComponent;
import com.example.resource.RawMaterial;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ProductionSuggestionService {

    public Map<Product, Integer> suggestProduction(List<Product> products, List<RawMaterial> materials) {
        Map<Product, Integer> suggestions = new HashMap<>();
        
        Product bestProduct = null;
        double maxTotalValue = -1;
        int bestQuantity = 0;

        for (Product product : products) {
            int maxPossibleForThisProduct = Integer.MAX_VALUE;
            
            if (product.components == null || product.components.isEmpty()) {
                continue;
            }

            for (ProductComponent component : product.components) {
                RawMaterial material = findMaterial(materials, component.rawMaterial.id);
                if (material == null || material.stockQuantity == 0) {
                    maxPossibleForThisProduct = 0;
                    break;
                }
                
                int possibleWithThisMaterial = (int) (material.stockQuantity / component.required_quantity);
                maxPossibleForThisProduct = Math.min(maxPossibleForThisProduct, possibleWithThisMaterial);
            }

            if (maxPossibleForThisProduct > 0) {
                double totalValue = maxPossibleForThisProduct * product.price;
                if (totalValue > maxTotalValue) {
                    maxTotalValue = totalValue;
                    bestProduct = product;
                    bestQuantity = maxPossibleForThisProduct;
                }
            }
        }

        if (bestProduct != null) {
            suggestions.put(bestProduct, bestQuantity);
        }

        return suggestions;
    }

    private RawMaterial findMaterial(List<RawMaterial> materials, Long id) {
        return materials.stream()
                .filter(m -> m.id.equals(id))
                .findFirst()
                .orElse(null);
    }
}
