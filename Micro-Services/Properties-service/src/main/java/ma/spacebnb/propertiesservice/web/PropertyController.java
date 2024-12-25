package ma.spacebnb.propertiesservice.web;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import ma.spacebnb.propertiesservice.dao.entities.Property;
import ma.spacebnb.propertiesservice.service.PropertyService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "*")
public class PropertyController {

    private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    // Second API Endpoint to fetch properties from Apify dataset
    @GetMapping("/fetchApifyProperties")
    public ResponseEntity<List<Property>> fetchApifyProperties() {
        try {
            List<Property> properties = propertyService.fetchApifyProperties();
            return ResponseEntity.ok(properties);
        } catch (Exception e) {
            e.printStackTrace(); // Replace with logging
            return ResponseEntity.status(500).body(List.of());
        }
    }
}