package com.example.resource;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.notNullValue;
import jakarta.ws.rs.core.Response;

@QuarkusTest
public class ProductionResourceTest {

    @Test
    @DisplayName("Should return 200 OK for production suggestions")
    public void testProductionSuggestionEndpoint() {
        given()
          .when().get("/production/suggestion")
          .then()
             .statusCode(Response.Status.OK.getStatusCode())
             .body(notNullValue());
    }
}