package com.example.repository;

import com.example.resource.ProductComponent;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ProductComponentRepository implements PanacheRepository<ProductComponent> {
}
