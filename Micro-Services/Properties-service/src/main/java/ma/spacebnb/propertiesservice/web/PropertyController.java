package ma.spacebnb.propertiesservice.web;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import ma.spacebnb.propertiesservice.dao.entities.Property;
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

    // First API details (for context)
    private static final String API_URL_1 = "https://airbnb13.p.rapidapi.com/search-geo";
    private static final String RAPIDAPI_KEY_1 = "87f971b688mshe63806b1f340064p11d851jsna0aaf106ff81";
    private static final String RAPIDAPI_HOST_1 = "airbnb13.p.rapidapi.com";

    // Second API details (Apify dataset URL)
    private static final String API_URL_2 = "https://api.apify.com/v2/datasets/rz5FbJFUsCk67YGdD/items?clean=true&format=json";

    // First API Endpoint to fetch properties from Airbnb
    @GetMapping("/fetch")
    public ResponseEntity<List<Property>> fetchPropertiesFromApi() {
        RestTemplate restTemplate = new RestTemplate();

        try {
            // Set headers for the first API
            HttpHeaders headers = new HttpHeaders();
            headers.set("x-rapidapi-key", RAPIDAPI_KEY_1);
            headers.set("x-rapidapi-host", RAPIDAPI_HOST_1);

            HttpEntity<String> entity = new HttpEntity<>(headers);

            // Make the API call
            ResponseEntity<String> response = restTemplate.exchange(
                    API_URL_1,
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

    // Second API Endpoint to fetch properties from Apify dataset (No parameters needed)
    @GetMapping("/fetchApifyProperties")
    public ResponseEntity<List<Property>> fetchApifyProperties() {
        RestTemplate restTemplate = new RestTemplate();

        try {
            // Set headers for the second API (Apify)
            HttpHeaders headers = new HttpHeaders();
            // You can add authentication headers if needed (for example, an API key)
            // headers.set("Authorization", "Bearer YOUR_API_KEY");

            HttpEntity<String> entity = new HttpEntity<>(headers);

            // Make the API call
            ResponseEntity<String> response = restTemplate.exchange(
                    API_URL_2,
                    HttpMethod.GET,
                    entity,
                    String.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                // Parse the JSON response
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode rootNode = objectMapper.readTree(response.getBody());

                List<Property> properties = new ArrayList<>();
                for (JsonNode node : rootNode) {
                    Property property = new Property();

                    // Adjust the property fields based on the response structure from the Apify API
                    property.setTitle(node.path("title").asText("Unknown Title"));
                    property.setName(node.path("sharingConfigTitle").asText("Unknown Name"));
                    property.setCity(node.path("city").asText("Unknown City"));
                    property.setMetaDescription(node.path("metaDescription").asText("Unknown Latitude"));
                    // Map coordinates (latitude, longitude)
                    JsonNode coordinatesNode = node.path("coordinates");
                    if (coordinatesNode != null && coordinatesNode.isObject()) {
                        double latitude = coordinatesNode.path("latitude").asDouble(0.0);
                        double longitude = coordinatesNode.path("longitude").asDouble(0.0);
                        property.setLatitude(latitude);
                        property.setLongitude(longitude);
                    }
                    property.setPricePerNight(node.path("price").asDouble(0.0));
                    JsonNode ratingNode = node.path("rating");
                    double accuracy = ratingNode.path("accuracy").asDouble(0.0);
                    property.setRating(accuracy);
                    property.setCity(node.path("locationSubtitle").asText("Unknown City"));
                    property.setAddress(node.path("address").asText("Unknown Address"));
                    property.setType(node.path("propertyType").asText("Unknown Type"));

                    // Get the sharingConfigTitle field from the JSON node
                    String sharingConfigTitle = node.path("sharingConfigTitle").asText();

                    // Regex to match "X bedroom", "X bed", "X bath", including "private bath" or "shared bathroom"
                    Pattern pattern = Pattern.compile("(\\d+)\\s+(bedroom|bed|bath|bathroom)");
                    Matcher matcher = pattern.matcher(sharingConfigTitle);

                    // Initialize counts
                    int beds = 0;
                    int bedrooms = 0;
                    int bathrooms = 0;
                    boolean bathFound = false;

                    // Process matches
                    while (matcher.find()) {
                        int value = Integer.parseInt(matcher.group(1)); // Extract the number
                        String type = matcher.group(2).toLowerCase();  // Extract the type in lowercase for consistency

                        if (type.equals("bedroom")) {
                            bedrooms = value;
                        } else if (type.equals("bed")) {
                            beds = value;
                        } else if (type.contains("bath")) { // Matches any form of "bath"
                            bathrooms = value;
                            bathFound = true;
                        }
                    }

                    // If the word "bath" is found but no number is provided, default bathrooms to 1
                    if (!bathFound && sharingConfigTitle.toLowerCase().contains("bath")) {
                        bathrooms = 1;
                    }

                    // Set the extracted values in the Property object
                    property.setBeds(beds);
                    property.setBedrooms(bedrooms);
                    property.setBathrooms(bathrooms);
                    property.setPersons(node.path("personCapacity").asInt());
                    // Extract and set price information
                    JsonNode priceNode = node.path("price");
                    if (priceNode != null && priceNode.isObject()) {
                        String price = priceNode.path("price").asText("0");
                        property.setPricePerNight(Double.parseDouble(price.replaceAll("[^\\d.]", "")));  // Remove non-numeric characters
                    }

                    // Extract and set cleaning fee
                    assert priceNode != null;
                    JsonNode priceBreakdownNode = priceNode.path("breakDown");
                    if (priceBreakdownNode != null && priceBreakdownNode.isObject()) {
                        JsonNode cleaningFeeNode = priceBreakdownNode.path("cleaningFee");
                        if (cleaningFeeNode != null && cleaningFeeNode.isObject()) {
                            String cleaningFee = cleaningFeeNode.path("price").asText("0");
                            property.setCleaningFee(Double.parseDouble(cleaningFee.replaceAll("[^\\d.]", "")));  // Clean the dollar sign and get the numeric value
                        }
                    }
                    // Extract and set images
                    List<String> images = new ArrayList<>();
                    JsonNode imagesNode = node.path("images");
                    if (imagesNode.isArray()) {
                        for (JsonNode imageNode : imagesNode) {
                            String imageUrl = imageNode.path("imageUrl").asText();
                            images.add(imageUrl);  // Add the image URL to the list
                        }
                    }
                    property.setImages(images);
                    // Extract and set house rules titles
                    List<String> houseRules = new ArrayList<>();
                    JsonNode houseRulesNode = node.path("houseRules").path("general");
                    if (houseRulesNode.isArray()) {
                        for (JsonNode ruleCategory : houseRulesNode) {
                            JsonNode valuesNode = ruleCategory.path("values");
                            if (valuesNode.isArray()) {
                                for (JsonNode rule : valuesNode) {
                                    String ruleTitle = rule.path("title").asText();
                                    houseRules.add(ruleTitle);  // Add the title to the houseRules list
                                }
                            }
                        }
                    }
                    property.setRules(houseRules);
                    // Map description (if available)
                    property.setDescription(node.path("description").asText("No Description Available"));

                    // Extract and set amenities titles
                    List<String> amenities = new ArrayList<>();
                    JsonNode amenitiesNode = node.path("amenities");
                    if (amenitiesNode.isArray()) {
                        for (JsonNode category : amenitiesNode) {
                            // Extract the title of the category
                            String categoryTitle = category.path("title").asText();
                            amenities.add(categoryTitle);

                            // Extract the titles from the "values" array inside each category
                            JsonNode valuesNode = category.path("values");
                            if (valuesNode.isArray()) {
                                for (JsonNode amenity : valuesNode) {
                                    String amenityTitle = amenity.path("title").asText();
                                    amenities.add(amenityTitle);  // Add the amenity title to the list
                                }
                            }
                        }
                    }
                    property.setAmenities(amenities);

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
}
