package com.example.resource;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.OneToMany;
import java.util.List;

@Entity
@Table(name = "product")
public class Product extends PanacheEntity {
    public String name;
    public Double price;

    @OneToMany(mappedBy = "product")
    public List<ProductComponent> components;
}