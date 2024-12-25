package ma.xproce.springsecurity.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import ma.xproce.springsecurity.dao.entity.Host;
import ma.xproce.springsecurity.dao.repositories.HostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.ArrayList;
import java.util.List;



@Service
public class HostService {

    private static final String API_URL = "https://api.apify.com/v2/datasets/rz5FbJFUsCk67YGdD/items?clean=true&format=json";

    @Autowired
    private HostRepository hostRepository;

    // Fetch all hosts from the database
    public List<Host> fetchAllHostsFromDb() {
        return hostRepository.findAll();
    }

    // Fetch and save hosts (if needed, modify or call it elsewhere)
    public List<Host> fetchAndSaveHostData() {
        List<Host> hosts = fetchApifyHosts(); // Call the method to fetch host data
        if (!hosts.isEmpty()) {
            // Save all hosts to the database
            hostRepository.saveAll(hosts);
        }
        return hosts;
    }

    public List<Host> fetchApifyHosts() {
        RestTemplate restTemplate = new RestTemplate();
        List<Host> hosts = new ArrayList<>();

        try {
            // Set headers for the API (if authentication is needed)
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<>(headers);

            // Make the API call
            ResponseEntity<String> response = restTemplate.exchange(
                    API_URL,
                    HttpMethod.GET,
                    entity,
                    String.class
            );

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                // Parse the JSON response
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode rootNode = objectMapper.readTree(response.getBody());

                for (JsonNode node : rootNode) {
                    Host host = new Host();

                    // Extract data from the JSON and map to Host object
                    host.setId(node.get("id").asText());

                    // Extract host information
                    host.setName(node.path("host").path("name").asText("Unknown Name"));
                    host.setUsername(node.path("host").path("name").asText("Unknown Username"));
                    host.setProfileImage(node.path("host").path("profileImage").asText(""));

                    // Handle Super Host and Verified status
                    host.setSuperHost(node.path("host").path("isSuperHost").asBoolean(false));
                    host.setVerified(node.path("host").path("isVerified").asBoolean(false));

                    host.setRatingCount(node.path("host").path("ratingCount").asInt(0));
                    host.setRatingAverage(node.path("host").path("ratingAverage").asDouble(0));
                    // Handle host details, if any
                    JsonNode hostDetailsNode = node.path("host").path("hostDetails");
                    if (hostDetailsNode.isArray()) {
                        List<String> hostDetails = new ArrayList<>();
                        hostDetailsNode.forEach(detail -> hostDetails.add(detail.asText()));
                        host.setHostDetails(hostDetails);
                    }

                    // Handle time as host
                    JsonNode timeAsHostNode = node.path("host").path("timeAsHost");
                    if (timeAsHostNode.isObject()) {
                        Host.TimeAsHost timeAsHost = new Host.TimeAsHost();
                        timeAsHost.setYears(timeAsHostNode.path("years").asInt(0));
                        timeAsHost.setMonths(timeAsHostNode.path("months").asInt(0));
                        host.setTimeAsHost(timeAsHost);
                    }

                    // Extract highlights if available
                    JsonNode highlightsNode = node.path("host").path("highlights");
                    if (highlightsNode.isArray()) {
                        List<String> highlights = new ArrayList<>();
                        highlightsNode.forEach(highlight -> highlights.add(highlight.asText()));
                        host.setHighlights(highlights);
                    }

                    // Extract about field if available
                    host.setAbout(node.path("host").path("about").asText(""));

                    // Add the host object to the list
                    hosts.add(host);
                }
            }

        } catch (Exception e) {
            e.printStackTrace(); // Replace with proper logging
        }

        return hosts;
    }
}
