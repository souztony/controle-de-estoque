package com.example.resource;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static io.restassured.RestAssured.given;
import jakarta.ws.rs.core.Response;

@QuarkusTest
public class RawMaterialResourceTest {

    @Test
    @DisplayName("Should list all raw materials")
    public void testListAllRawMaterials() {
        given()
          .when().get("/raw-materials")
          .then()
             .statusCode(Response.Status.OK.getStatusCode());
    }
}