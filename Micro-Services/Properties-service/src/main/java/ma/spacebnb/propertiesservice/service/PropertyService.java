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
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class PropertyService {

    // Second API details (Apify dataset URL)
    private static final String API_URL_2 = "https://api.apify.com/v2/datasets/rz5FbJFUsCk67YGdD/items?clean=true&format=json";

    @Autowired
    private PropertyRepository propertyRepository;


    // Fetch all properties from the database
    public List<Property> fetchAllPropertiesFromDb() {
        // Fetch properties from the database using the repository
        return propertyRepository.findAll();
    }

    // Method to fetch and save properties (if needed, modify or call it elsewhere)
    public List<Property> fetchAndSaveApifyProperties() {
        List<Property> properties = fetchApifyProperties(); // Call the method to fetch Apify properties
        if (!properties.isEmpty()) {
            // Save all properties to the database
            propertyRepository.saveAll(properties);
        }
        return properties;
    }


    public List<Property> fetchApifyProperties() {
        RestTemplate restTemplate = new RestTemplate();
        List<Property> properties = new ArrayList<>();

        try {
   
            HttpHeaders headers = new HttpHeaders();


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

                for (JsonNode node : rootNode) {
                    Property property = new Property();

                    // Extract data from the JSON and map to Property object
                    property.setId(node.get("id").asText());
                    JsonNode hostNode = node.path("host");
                    if (hostNode != null && hostNode.isObject()) {
                        String hostId = hostNode.path("id").asText("");
                        property.setHostId(hostId);
                    }

                    // Navigate to the "serviceFee" -> "price" in the JSON structure
                    JsonNode serviceFeeNode = node.path("price").path("breakDown").path("serviceFee").path("price");
                    if (serviceFeeNode != null && !serviceFeeNode.asText().isEmpty()) {
                        String serviceFeeText = serviceFeeNode.asText();

                        // If the price starts with "$", parse it as a double after removing the "$"
                        if (serviceFeeText.startsWith("$")) {
                            double serviceFee = Double.parseDouble(serviceFeeText.substring(1));
                            // Set the serviceFee to the Property object
                            property.setServiceFee(serviceFee);
                        }
                    }



                    JsonNode locationDescriptionsNode = node.path("locationDescriptions");

                    // Check if 'locationDescriptions' is an array and has at least 3 elements
                    if (locationDescriptionsNode.isArray() && !locationDescriptionsNode.isEmpty()) {
                        // Get the third description from the array (index 2)
                        JsonNode thirdDescription = locationDescriptionsNode.get(0);

                        // Extract the 'content' from the third description
                        String content = thirdDescription.path("content").asText("");
                        property.setDescription(content);
                    }

                    property.setTitle(node.path("title").asText("Unknown Title"));
                    property.setName(node.path("sharingConfigTitle").asText("Unknown Name"));
                    JsonNode breadcrumbsNode = node.path("breadcrumbs");
                    // Check if 'breadcrumbs' is an array and has at least one element
                    if (breadcrumbsNode.isArray() && !breadcrumbsNode.isEmpty()) {
                        // Get the first breadcrumb
                        JsonNode firstBreadcrumb = breadcrumbsNode.get(0);

                        // Extract the 'searchText' from the first breadcrumb
                        String searchText = firstBreadcrumb.path("searchText").asText("");

                        property.setCity(searchText);
                    }
                    property.setMetaDescription(node.path("metaDescription").asText("Unknown Latitude"));

                    // Handle coordinates
                    JsonNode coordinatesNode = node.path("coordinates");
                    if (coordinatesNode != null && coordinatesNode.isObject()) {
                        double latitude = coordinatesNode.path("latitude").asDouble(0.0);
                        double longitude = coordinatesNode.path("longitude").asDouble(0.0);
                        property.setLatitude(latitude);
                        property.setLongitude(longitude);
                    }
                    property.setPricePerNight(node.path("price").asDouble(0.0));

                    // Handle rating
                    JsonNode ratingNode = node.path("rating");
                    double accuracy = ratingNode.path("accuracy").asDouble(0.0);
                    property.setRating(accuracy);

                    property.setType(node.path("propertyType").asText("Unknown Type"));

                    // Extract bedroom, bed, and bath details
                    String sharingConfigTitle = node.path("sharingConfigTitle").asText();
                    extractBedsAndBaths(sharingConfigTitle, property);

                    // Handle other properties like persons, cleaning fee, images, etc.
                    property.setPersons(node.path("personCapacity").asInt());
                    extractPriceDetails(node, property);
                    extractImages(node, property);
                    extractHouseRules(node, property);
                    extractAmenities(node, property);

                    properties.add(property);
                }
            }

        } catch (Exception e) {
            e.printStackTrace(); // Replace with proper logging
        }

        return properties;
    }

    private void extractBedsAndBaths(String sharingConfigTitle, Property property) {
        Pattern pattern = Pattern.compile("(\\d+)\\s+(bedroom|bed|bath|bathroom|shared\\sbath|private\\sbath|shared\\sbathroom|private\\sbathroom)");
        Matcher matcher = pattern.matcher(sharingConfigTitle);

        int beds = 0;
        int bedrooms = 0;
        int bathrooms = 0;
        boolean bathFound = false;
        boolean sharedBath = false;
        boolean privateBath = false;

        while (matcher.find()) {
            int value = Integer.parseInt(matcher.group(1));
            String type = matcher.group(2).toLowerCase();

            if (type.equals("bedroom")) {
                bedrooms = value;
            } else if (type.equals("bed")) {
                beds = value;
            } else if (type.contains("bath") || type.contains("bathroom")) {
                if (type.contains("shared")) {
                    sharedBath = true;
                    bathrooms = value;
                } else if (type.contains("private")) {
                    privateBath = true;
                    bathrooms = value;
                } else {
                    bathrooms = value;
                    bathFound = true;
                }
            }
        }

        if (!bathFound && !sharedBath && !privateBath && sharingConfigTitle.toLowerCase().contains("bath")) {
            bathrooms = 1;
        }

        if (sharedBath && bathrooms == 0) {
            bathrooms = 1;
        }

        if (privateBath && bathrooms == 0) {
            bathrooms = 1;
        }

        property.setBeds(beds);
        property.setBedrooms(bedrooms);
        property.setBathrooms(bathrooms);
    }

    private void extractPriceDetails(JsonNode node, Property property) {
        JsonNode priceNode = node.path("price");
        if (priceNode != null && priceNode.isObject()) {
            String price = priceNode.path("price").asText("0");
            property.setPricePerNight(Double.parseDouble(price.replaceAll("[^\\d.]", "")));
        }

        JsonNode priceBreakdownNode = priceNode.path("breakDown");
        if (priceBreakdownNode != null && priceBreakdownNode.isObject()) {
            JsonNode cleaningFeeNode = priceBreakdownNode.path("cleaningFee");
            if (cleaningFeeNode != null && cleaningFeeNode.isObject()) {
                String cleaningFee = cleaningFeeNode.path("price").asText("0");
                property.setCleaningFee(Double.parseDouble(cleaningFee.replaceAll("[^\\d.]", "")));
            }
        }
    }

    private void extractImages(JsonNode node, Property property) {
        List<String> images = new ArrayList<>();
        JsonNode imagesNode = node.path("images");
        if (imagesNode.isArray()) {
            for (JsonNode imageNode : imagesNode) {
                String imageUrl = imageNode.path("imageUrl").asText();
                images.add(imageUrl);
            }
        }
        property.setImages(images);
    }

    private void extractHouseRules(JsonNode node, Property property) {
        List<String> houseRules = new ArrayList<>();
        JsonNode houseRulesNode = node.path("houseRules").path("general");
        if (houseRulesNode.isArray()) {
            for (JsonNode ruleCategory : houseRulesNode) {
                JsonNode valuesNode = ruleCategory.path("values");
                if (valuesNode.isArray()) {
                    for (JsonNode rule : valuesNode) {
                        String ruleTitle = rule.path("title").asText();
                        houseRules.add(ruleTitle);
                    }
                }
            }
        }
        property.setRules(houseRules);
    }

    private void extractAmenities(JsonNode node, Property property) {
        List<String> amenities = new ArrayList<>();
        JsonNode amenitiesNode = node.path("amenities");
        if (amenitiesNode.isArray()) {
            for (JsonNode category : amenitiesNode) {
                String categoryTitle = category.path("title").asText();
                amenities.add(categoryTitle);

                JsonNode valuesNode = category.path("values");
                if (valuesNode.isArray()) {
                    for (JsonNode amenity : valuesNode) {
                        String amenityTitle = amenity.path("title").asText();
                        amenities.add(amenityTitle);
                    }
                }
            }
        }
        property.setAmenities(amenities);
    }
}