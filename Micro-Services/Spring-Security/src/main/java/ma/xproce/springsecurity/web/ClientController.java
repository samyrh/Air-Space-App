package ma.xproce.springsecurity.web;

import ma.xproce.springsecurity.dao.entity.Guest;
import ma.xproce.springsecurity.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/clients")
public class ClientController {

    @Autowired
    private ClientService clientService; // Assume you have a service that handles the logic


    @GetMapping("")
    public ResponseEntity<List<Guest>> getClients() {
        try {
            List<Guest> clients = clientService.getAllClients();
            return ResponseEntity.ok(clients);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    // Get a client by ID
    @GetMapping("/{id}")
    public ResponseEntity<Guest> getClient(@PathVariable Long id) {
        Optional<Guest> client = clientService.getClientById(id);  // Get the client by ID

        // If client is found, return 200 OK with client data
        // If client is not found, return 404 Not Found
        return client.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<Guest> addClient(@RequestBody Guest client) {
        try {
            System.out.println("Received Client: " + client); // Log the received client
            Guest savedClient = clientService.addClient(client);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedClient);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    // Edit an existing client
    @PutMapping("/update/{id}")
    public Guest updateClient(@PathVariable Long id, @RequestBody Guest client) {
        return clientService.updateClient(id, client);
    }

    // Delete a client
    @DeleteMapping("/delete/{id}")
    public void deleteClient(@PathVariable Long id) {
        clientService.deleteClient(id);
    }
}

