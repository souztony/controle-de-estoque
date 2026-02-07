package com.example.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(
    name = "product_component",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"product_id", "raw_material_id"})
    }
)
public class ProductComponent {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id")
    @JsonBackReference(value="product-component")
    private Product product;

    @ManyToOne(optional = false)
    @JoinColumn(name = "raw_material_id")
    @JsonIgnoreProperties("components")
    private RawMaterial rawMaterial;

    @Column(name = "required_quantity", nullable = false)
    private BigDecimal requiredQuantity;

    public ProductComponent() {
    }

    public Long getId() {
        return id;
    }

    public Product getProduct() {
        return product;
    }

    public RawMaterial getRawMaterial() {
        return rawMaterial;
    }

    public BigDecimal getRequiredQuantity() {
        return requiredQuantity;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public void setRawMaterial(RawMaterial rawMaterial) {
        this.rawMaterial = rawMaterial;
    }

    public void setRequiredQuantity(BigDecimal requiredQuantity) {
        this.requiredQuantity = requiredQuantity;
    }
}
