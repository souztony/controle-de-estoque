package com.example.resource;

import com.example.entity.Product;
import com.example.repository.ProductRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/products")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@jakarta.enterprise.context.ApplicationScoped
public class ProductResource {

    @Inject
    ProductRepository repository;

    @GET
    public List<Product> list() {
        return repository.listAll();
    }

    @GET
    @Path("/{id}")
    public Product get(@PathParam("id") Long id) {
        return repository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Product not found"));
    }

    @POST
    @Transactional
    public Response create(Product product) {
        System.out.println("POST /products - In: " + product.getName());
        try {
            if (product.getComponents() != null) {
                for (var component : product.getComponents()) {
                    component.setProduct(product);
                }
            }
            repository.persist(product);
            repository.flush();
            return Response.status(Response.Status.CREATED).entity(product).build();
        } catch (Exception e) {
             if (isConstraintViolation(e)) {
                throw new WebApplicationException(
                    Response.status(409).entity("Product code or name already exists.").build()
                );
            }
            e.printStackTrace();
            throw new WebApplicationException("Error creating product: " + e.getMessage(), 500);
        }
    }

    private boolean isConstraintViolation(Exception e) {
        Throwable t = e;
        while (t != null) {
            if (t.getClass().getName().contains("ConstraintViolationException") || 
                t instanceof org.hibernate.exception.ConstraintViolationException) {
                return true;
            }
            t = t.getCause();
        }
        return false;
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Product update(@PathParam("id") Long id, Product product) {
        System.out.println("PUT /products/" + id + " - In: " + product.getName());
        try {
            Product entity = repository.findByIdOptional(id)
                    .orElseThrow(() -> new NotFoundException("Product not found"));

            entity.setCode(product.getCode());
            entity.setName(product.getName());
            entity.setPrice(product.getPrice());

            entity.getComponents().clear();
            repository.flush();
            
            if (product.getComponents() != null) {
                for (var component : product.getComponents()) {
                    component.setProduct(entity);
                    if (component.getRawMaterial() != null && component.getRawMaterial().getId() != null) {
                    }
                    entity.getComponents().add(component);
                }
            }

            System.out.println("PUT /products/" + id + " - Success");
            return entity;
        } catch (Exception e) {
            if (isConstraintViolation(e)) {
                throw new WebApplicationException(
                    Response.status(409).entity("Product code or name already exists.").build()
                );
            }
            System.err.println("ERROR in PUT /products/" + id + ": " + e.getMessage());
            e.printStackTrace();
            throw new WebApplicationException("Error updating product: " + e.getMessage(), Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(@PathParam("id") Long id) {
        Product entity = repository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Product not found"));

        repository.delete(entity);
    }
}