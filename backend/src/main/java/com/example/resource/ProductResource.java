package com.example.resource;

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
        repository.persist(product);
        return Response.status(Response.Status.CREATED).entity(product).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Product update(@PathParam("id") Long id, Product product) {
        Product entity = repository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Product not found"));

        entity.setName(product.getName());
        entity.setPrice(product.getPrice());

        return entity;
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
