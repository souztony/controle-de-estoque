package com.example.resource;

import com.example.entity.RawMaterial; // IMPORTANTE: Adicione este import para reconhecer a classe
import com.example.repository.RawMaterialRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/raw-materials")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@jakarta.enterprise.context.ApplicationScoped
public class RawMaterialResource {

    @Inject
    RawMaterialRepository repository;

    @GET
    public List<RawMaterial> list() {
        return repository.listAll();
    }

    @GET
    @Path("/{id}")
    public RawMaterial get(@PathParam("id") Long id) {
        return repository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Raw material not found"));
    }

    @POST
    @Transactional
    public RawMaterial create(RawMaterial material) {
        System.out.println("POST /raw-materials - In: " + material.getName());
        repository.persist(material);
        System.out.println("POST /raw-materials - Success ID: " + material.getId());
        return material;
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public RawMaterial update(@PathParam("id") Long id, RawMaterial material) {
        System.out.println("PUT /raw-materials/" + id + " - In: " + material.getName());
        try {
            RawMaterial entity = repository.findByIdOptional(id)
                    .orElseThrow(() -> new NotFoundException("Raw material not found"));

            // Atualiza os dados da matéria-prima
            entity.setCode(material.getCode());
            entity.setName(material.getName());
            entity.setStockQuantity(material.getStockQuantity());
            
            repository.flush(); // Força a persistência para detectar violações de constraint

            System.out.println("PUT /raw-materials/" + id + " - Success");
            return entity;
        } catch (Exception e) {
            System.err.println("ERROR in PUT /raw-materials/" + id + ": " + e.getMessage());
            e.printStackTrace();
            throw new WebApplicationException("Error updating material: " + e.getMessage(), Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(@PathParam("id") Long id) {
        RawMaterial entity = repository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Raw material not found"));

        repository.delete(entity);
    }
}