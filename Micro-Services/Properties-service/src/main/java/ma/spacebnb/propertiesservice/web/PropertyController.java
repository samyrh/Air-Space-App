package ma.spacebnb.propertiesservice.web;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import ma.spacebnb.propertiesservice.dao.entities.Property;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "*")
public class PropertyController {

    private static final String API_URL = "https://airbnb13.p.rapidapi.com/search-geo";
    private static final String RAPIDAPI_KEY = "87f971b688mshe63806b1f340064p11d851jsna0aaf106ff81";
    private static final String RAPIDAPI_HOST = "airbnb13.p.rapidapi.com";

    // Endpoint to fetch properties from Airbnb API
    @GetMapping("/fetch")
    public ResponseEntity<List<Property>> fetchPropertiesFromApi() {
        RestTemplate restTemplate = new RestTemplate();

        try {
            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.set("x-rapidapi-key", RAPIDAPI_KEY);
            headers.set("x-rapidapi-host", RAPIDAPI_HOST);

            HttpEntity<String> entity = new HttpEntity<>(headers);

            // Make the API call
            ResponseEntity<String> response = restTemplate.exchange(
                    API_URL,
                    HttpMethod.GET,
                    entity,
                    String.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                // Parse the JSON response
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode rootNode = objectMapper.readTree(response.getBody());

                List<Property> properties = new ArrayList<>();
                for (JsonNode node : rootNode.get("results")) {
                    Property property = new Property();

                    property.setTitle(node.path("name").asText("Unknown Title"));
                    property.setCity(node.path("city").asText("Unknown City"));
                    property.setLatitude(node.path("lat").asDouble(0.0));
                    property.setLongitude(node.path("lng").asDouble(0.0));
                    property.setPricePerNight(node.path("price").path("rate").asDouble(0.0));
                    property.setRating(node.path("rating").asDouble(0.0));
                    property.setAddress(node.path("address").asText("Unknown Address"));
                    property.setType(node.path("type").asText("Unknown Type"));
                    property.setBeds(node.path("beds").asInt());
                    property.setBedrooms(node.path("bedrooms").asInt());
                    property.setBathrooms(node.path("bathrooms").asInt());
                    property.setPersons(node.path("persons").asInt());
                    // Map images
                    List<String> images = new ArrayList<>();
                    for (JsonNode imageNode : node.path("images")) {
                        images.add(imageNode.asText());
                    }
                    property.setImages(images);

                    // Map description (if available)
                    property.setDescription(node.path("description").asText("No Description Available"));

                    properties.add(property);
                }

                return ResponseEntity.ok(properties);
            } else {
                return ResponseEntity.status(response.getStatusCode()).body(List.of());
            }

        } catch (Exception e) {
            e.printStackTrace(); // Replace with logger
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(List.of());
        }
    }



    // Additional endpoints can go here
}
