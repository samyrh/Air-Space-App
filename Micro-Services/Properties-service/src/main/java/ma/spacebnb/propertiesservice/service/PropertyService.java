package ma.spacebnb.propertiesservice.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import ma.spacebnb.propertiesservice.dao.entities.Property;
import ma.spacebnb.propertiesservice.dao.repositories.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    private static final String API_URL = "https://airbnb13.p.rapidapi.com/search-geo";
    private static final String RAPIDAPI_KEY = "87f971b688mshe63806b1f340064p11d851jsna0aaf106ff81";
    private static final String RAPIDAPI_HOST = "airbnb13.p.rapidapi.com";

    // Save a property
    public Property saveProperty(Property property) {
        return propertyRepository.save(property);
    }

    // Get all properties
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    // Fetch properties from the Airbnb API
    public List<Property> fetchPropertiesFromApi() {
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

            // Parse the JSON response
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response.getBody());

            // Assuming the API response has a "results" array
            List<Property> properties = new ArrayList<>();
            for (JsonNode node : rootNode.get("results")) {
                Property property = new Property();
                property.setTitle(node.get("name").asText());
                property.setCity(node.get("city").asText());
                property.setLatitude(node.get("lat").asDouble());
                property.setLongitude(node.get("lng").asDouble());
                property.setPricePerNight(node.get("price").get("price").asDouble());
                properties.add(property);
            }

            return properties;

        } catch (Exception e) {
            e.printStackTrace();
            return List.of(); // Return an empty list on failure
        }
    }
}
