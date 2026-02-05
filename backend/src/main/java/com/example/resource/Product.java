package com.example.resource;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import java.util.List;

@Entity
@Table(name = "product")
public class Product extends PanacheEntity {
    public String name;
    public Double price;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    public List<ProductComponent> components;

    public Product() {}

    public Product(Long id, String name, Double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public void setComponents(List<ProductComponent> components) {
        this.components = components;
    }
}