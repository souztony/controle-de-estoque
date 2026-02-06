package com.example.service;

import com.example.entity.Product;
import com.example.entity.ProductComponent;
import com.example.repository.ProductRepository;
import com.example.dto.ProductionSuggestionDTO;
import io.quarkus.panache.common.Sort;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.math.BigDecimal;

@ApplicationScoped
public class ProductionService {

    @Inject
    ProductRepository productRepository;

    public List<ProductionSuggestionDTO> calculateProduction() {
        // Busca produtos do mais caro para o mais barato
        List<Product> products = productRepository.listAll(Sort.by("price").descending());
        List<ProductionSuggestionDTO> suggestions = new ArrayList<>();

        for (Product p : products) {
            int maxForThisProduct = Integer.MAX_VALUE;

            // Se o método no seu Product.java for getComponents(), mantenha assim.
            // Se der erro aqui, mude para: p.components
            if (p.getComponents() == null || p.getComponents().isEmpty()) {
                continue;
            }

            for (ProductComponent comp : p.getComponents()) {
                // 1. Pegamos os valores em BigDecimal
                BigDecimal stockBD = comp.getRawMaterial().getStockQuantity();
                BigDecimal requiredBD = comp.getRequiredQuantity();

                // 2. Convertemos para 'int' para fazer a divisão de unidades inteiras
                // Usamos .intValue() para resolver o erro de "Type mismatch"
                if (requiredBD != null && requiredBD.compareTo(BigDecimal.ZERO) > 0) {
                    int stock = stockBD.intValue();
                    int required = requiredBD.intValue();
                    
                    int possible = stock / required;

                    if (possible < maxForThisProduct) {
                        maxForThisProduct = possible;
                    }
                }
            }

            if (maxForThisProduct > 0 && maxForThisProduct != Integer.MAX_VALUE) {
                suggestions.add(new ProductionSuggestionDTO(p.getName(), maxForThisProduct, p.getPrice()));
            }
        }
        return suggestions;
    }
}