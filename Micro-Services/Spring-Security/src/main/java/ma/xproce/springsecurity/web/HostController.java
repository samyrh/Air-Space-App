package ma.xproce.springsecurity.web;


import ma.xproce.springsecurity.dao.entity.Host;
import ma.xproce.springsecurity.services.HostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/hosts")
public class HostController {

    @Autowired
    private HostService hostService;

    // Endpoint to fetch host data
    @GetMapping("/fetch")
    public ResponseEntity<List<Host>> getHosts() {
        try {
            // Fetch host data using the service
            List<Host> hosts = hostService.fetchApifyHosts();

            // Return the host list with HTTP 200 OK
            return ResponseEntity.ok(hosts);
        } catch (Exception e) {
            // Handle exceptions and return 500 Internal Server Error if something goes wrong
            return ResponseEntity.status(500).body(null);
        }
    }
}
