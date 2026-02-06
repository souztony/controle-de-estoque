package com.example.resource;

import com.example.entity.RawMaterial; // IMPORTANTE: Adicione este import para reconhecer a classe
import com.example.repository.RawMaterialRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/raw-materials")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
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
        repository.persist(material);
        return material;
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public RawMaterial update(@PathParam("id") Long id, RawMaterial material) {
        RawMaterial entity = repository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Raw material not found"));

        // Atualiza os dados da matéria-prima
        entity.setName(material.getName());
        entity.setStockQuantity(material.getStockQuantity());

        return entity;
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