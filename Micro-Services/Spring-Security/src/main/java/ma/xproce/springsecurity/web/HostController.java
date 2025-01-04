package ma.xproce.springsecurity.web;


import ma.xproce.springsecurity.dao.entity.Host;
import ma.xproce.springsecurity.dao.repositories.HostRepository;
import ma.xproce.springsecurity.services.HostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/hosts")
@CrossOrigin("*")
public class HostController {

    @Autowired
    private HostService hostService;
    @Autowired
    private HostRepository hostRepository;

    // Endpoint to fetch host data
    @GetMapping("/fetch")
    public ResponseEntity<List<Host>> getHosts() {
        try {
            // Fetch host data using the service
            List<Host> hosts = hostService.fetchAllHostsFromDb();

            // Return the host list with HTTP 200 OK
            return ResponseEntity.ok(hosts);
        } catch (Exception e) {
            // Handle exceptions and return 500 Internal Server Error if something goes wrong
            return ResponseEntity.status(500).body(null);
        }
    }

    // Endpoint to fetch a host by its ref (String)
    @GetMapping("/fetch/{ref}")
    public ResponseEntity<Host> getHostByRef(@PathVariable("ref") String ref) {
        try {
            System.out.println("Fetching host with ref: " + ref);
            Optional<Host> host = hostService.getHostByRef(ref);
            return host.map(ResponseEntity::ok)
                    .orElseGet(() -> {
                        System.out.println("Host not found for ref: " + ref);
                        return ResponseEntity.status(404).body(null);
                    });
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/fetch/host/{id}")
    public ResponseEntity<Map<String, Host>> getHostById(@PathVariable("id") Long id) {
        try {
            Optional<Host> host = hostRepository.findById(id);
            return host.map(h -> {
                        Map<String, Host> response = new HashMap<>();
                        response.put("host", h);
                        return ResponseEntity.ok(response);
                    })
                    .orElseGet(() -> {
                        System.out.println("Host not found for id: " + id);
                        return ResponseEntity.status(404).body(null);
                    });
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }




}
