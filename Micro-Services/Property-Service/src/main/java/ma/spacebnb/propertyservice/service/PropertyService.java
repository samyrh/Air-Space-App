package ma.spacebnb.propertyservice.service;

import ma.spacebnb.propertyservice.dao.entity.Property;
import ma.spacebnb.propertyservice.dao.repositories.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    // Save a property
    public Property saveProperty(Property property) {
        return propertyRepository.save(property);
    }

    // Get all properties
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    // Fetch properties from Airbnb API
    public List<Property> fetchPropertiesFromApi() {
        String apiUrl = "https://airbnb13.p.rapidapi.com/search-geo?ne_lat=52.51&ne_lng=13.41&sw_lat=52.41&sw_lng=13.31&checkin=2025-01-12&checkout=2025-01-13&adults=1&children=0&infants=0&pets=0&page=1&currency=USD";

        RestTemplate restTemplate = new RestTemplate();

        try {
            var headers = new org.springframework.http.HttpHeaders();
            headers.set("x-rapidapi-host", "airbnb13.p.rapidapi.com");
            headers.set("x-rapidapi-key", "87f971b688mshe63806b1f340064p11d851jsna0aaf106ff81");

            var entity = new org.springframework.http.HttpEntity<>(headers);

            var response = restTemplate.exchange(
                    apiUrl,
                    org.springframework.http.HttpMethod.GET,
                    entity,
                    org.springframework.core.ParameterizedTypeReference.<List<Property>>forType(Property.class)
            );

            List<Property> properties = response.getBody();
            if (properties != null) {
                properties.forEach(this::saveProperty); // Save fetched properties to DB
            }

            return properties;
        } catch (Exception e) {
            e.printStackTrace();
            return List.of(); // Return empty list on error
        }
    }
}
