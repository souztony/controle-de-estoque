package com.example.resource;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;

@Entity
@Table(name = "product_component")
public class ProductComponent extends PanacheEntity {
    @ManyToOne
    @JoinColumn(name = "product_id")
    public Product product;
    
    @ManyToOne
    @JoinColumn(name = "raw_material_id")
    public RawMaterial rawMaterial;
    
    public Double required_quantity;
}