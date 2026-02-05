package com.example.resource;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "raw_material")
public class RawMaterial extends PanacheEntity {
    public String name;
    
    @Column(name = "stock_quantity")
    public Double stockQuantity;

    public RawMaterial() {}

    public RawMaterial(Long id, String name, double stockQuantity) {
        this.id = id;
        this.name = name;
        this.stockQuantity = stockQuantity;
    }
}