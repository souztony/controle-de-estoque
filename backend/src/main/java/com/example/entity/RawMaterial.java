package com.example.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "raw_material")
public class RawMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(name = "stock_quantity", nullable = false)
    private BigDecimal stockQuantity;

    @OneToMany(
        mappedBy = "rawMaterial",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<ProductComponent> components = new ArrayList<>();

    public RawMaterial() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public BigDecimal getStockQuantity() {
        return stockQuantity;
    }

    public List<ProductComponent> getComponents() {
        return components;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setStockQuantity(BigDecimal stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public void setComponents(List<ProductComponent> components) {
        this.components = components;
    }
}
