package ma.spacebnb.propertyservice.web;

import ma.spacebnb.propertyservice.dao.entity.Property;
import ma.spacebnb.propertyservice.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "*")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    // Endpoint to add a property
    @PostMapping
    public Property addProperty(@RequestBody Property property) {
        return propertyService.saveProperty(property);
    }

    // Endpoint to get all properties
    @GetMapping
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }

    // Endpoint to fetch properties from Airbnb API
    @GetMapping("/fetch")
    public List<Property> fetchPropertiesFromApi() {
        return propertyService.fetchPropertiesFromApi();
    }
}
