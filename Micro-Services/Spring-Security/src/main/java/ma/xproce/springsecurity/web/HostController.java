package ma.xproce.springsecurity.web;


import ma.xproce.springsecurity.dao.entity.Host;
import ma.xproce.springsecurity.services.HostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/hosts")
@CrossOrigin("*")
public class HostController {

    @Autowired
    private HostService hostService;

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
            // Fetch the host by ref using the service
            Optional<Host> host = hostService.getHostByRef(ref);

            // Return the host if found, otherwise return 404 Not Found
            return host.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(404).body(null));
        } catch (Exception e) {
            // Return 500 Internal Server Error if something goes wrong
            return ResponseEntity.status(500).body(null);
        }
    }
}
