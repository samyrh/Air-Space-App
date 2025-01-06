package ma.spacebnb.propertiesservice.web;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import ma.spacebnb.propertiesservice.dao.entities.Property;
import ma.spacebnb.propertiesservice.dao.repositories.PropertyRepository;
import ma.spacebnb.propertiesservice.service.PropertyService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "*")
public class PropertyController {

    private final PropertyService propertyService;
    private final PropertyRepository propertyRepository;

    public PropertyController(PropertyService propertyService, PropertyRepository propertyRepository) {
        this.propertyService = propertyService;
        this.propertyRepository = propertyRepository;
    }

    // Second API Endpoint to fetch properties from Apify dataset
    @GetMapping("/fetchApifyProperties")
    public ResponseEntity<List<Property>> fetchApifyProperties() {
        try {
            List<Property> properties = propertyService.fetchAllPropertiesFromDb();
            return ResponseEntity.ok(properties);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(List.of());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Property>> getPropertyById(@PathVariable Long id) {
        try {
            Optional<Property> property = propertyRepository.findById(id);
            if (property.isPresent()) {
                return ResponseEntity.ok(property);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    // New API to fetch properties by hostId
    @GetMapping("/host/{hostId}")
    public ResponseEntity<List<Property>> getPropertiesByHostId(@PathVariable String hostId) {
        try {
            // Assuming properties have a 'hostId' or equivalent field to match
            List<Property> properties = propertyRepository.findByHostId(hostId);

            if (properties.isEmpty()) {
                return ResponseEntity.notFound().build();  // No properties found for the host
            }

            return ResponseEntity.ok(properties);  // Return the list of properties for this host
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/top-rated")
    public List<Property> getTopRatedProperties() {
        return propertyService.getTop6RatedProperties();
    }
}
