package com.example.resource;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    @GET
    public List<Product> listAll() {
        return Product.listAll();
    }

    @POST
    @Transactional
    public Response create(Product product) {
        product.persist();
        return Response.status(Response.Status.CREATED).entity(product).build();
    }

    @GET
    @Path("/{id}")
    public Product getSingle(Long id) {
        return Product.findById(id);
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(Long id) {
        Product entity = Product.findById(id);
        if(entity == null) {
            throw new NotFoundException();
        }
        entity.delete();
    }
}