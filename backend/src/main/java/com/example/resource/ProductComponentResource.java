package com.example.resource;

import com.example.repository.ProductComponentRepository;
import com.example.repository.ProductRepository;
import com.example.repository.RawMaterialRepository;
import com.example.entity.Product;
import com.example.entity.ProductComponent;
import com.example.entity.RawMaterial;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/product-components")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ProductComponentResource {

    @Inject
    ProductComponentRepository componentRepository;

    @Inject
    ProductRepository productRepository;

    @Inject
    RawMaterialRepository rawMaterialRepository;

    @GET
    public List<ProductComponent> list() {
        return componentRepository.listAll();
    }

    @GET
    @Path("/product/{productId}")
    public List<ProductComponent> listByProduct(@PathParam("productId") Long productId) {
        return componentRepository.find("product.id", productId).list();
    }

    @POST
    @Transactional
    public ProductComponent create(ProductComponent component) {

        Product product = productRepository.findByIdOptional(
                component.getProduct().getId()
        ).orElseThrow(() -> new NotFoundException("Product not found"));

        RawMaterial rawMaterial = rawMaterialRepository.findByIdOptional(
                component.getRawMaterial().getId()
        ).orElseThrow(() -> new NotFoundException("Raw material not found"));

        component.setProduct(product);
        component.setRawMaterial(rawMaterial);

        componentRepository.persist(component);
        return component;
    }
}