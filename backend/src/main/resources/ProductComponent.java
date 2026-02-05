package com.example.resource;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "product_component")
public class ProductComponent extends PanacheEntity {

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    public Product product;

    @ManyToOne
    @JoinColumn(name = "raw_material_id")
    public RawMaterial rawMaterial;

    public Double required_quantity;
}