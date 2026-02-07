package com.example.resource;

import com.example.entity.Product; // IMPORTANTE: Adicione este import
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
        System.out.println("POST /products - In: " + product.getName() + ", Code: " + product.getCode() + ", Price: " + product.getPrice());
        if (product.getComponents() != null) {
            for (var component : product.getComponents()) {
                component.setProduct(product);
            }
        }
        repository.persist(product);
        System.out.println("POST /products - Persisted ID: " + product.getId());
        return Response.status(Response.Status.CREATED).entity(product).build();
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

            // Limpa componentes antigos e força o flush para evitar violação de constraint
            entity.getComponents().clear();
            repository.flush();
            
            if (product.getComponents() != null) {
                for (var component : product.getComponents()) {
                    component.setProduct(entity);
                    // Garante que o RawMaterial tenha apenas o ID para evitar problemas de merge
                    if (component.getRawMaterial() != null && component.getRawMaterial().getId() != null) {
                         // Opcional: recarregar o material do banco se necessário, mas passar o objeto com ID deve bastar
                    }
                    entity.getComponents().add(component);
                }
            }

            System.out.println("PUT /products/" + id + " - Success");
            return entity;
        } catch (Exception e) {
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