package ma.xproce.springsecurity.services;

import ma.xproce.springsecurity.dao.entity.Guest;
import ma.xproce.springsecurity.dao.repositories.GuestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private GuestRepository clientRepository;

    // Get all clients
    public List<Guest> getAllClients() {
        return clientRepository.findAll();
    }

    // Get a client by ID
    public Optional<Guest> getClientById(Long id) {
        return clientRepository.findById((long) Math.toIntExact(id));  // Return an Optional from the repository
    }

    // Add a new client with encoded password
    public Guest addClient(Guest client) {
        client.setPassword(passwordEncoder.encode(client.getPassword())); // Encode password
        return clientRepository.save(client);
    }

    // Update an existing client with encoded password
    public Guest updateClient(Long id, Guest clientDetails) {
        Optional<Guest> client = clientRepository.findById((long) Math.toIntExact(id));
        if (client.isPresent()) {
            Guest updatedClient = client.get();
            updatedClient.setName(clientDetails.getName());
            updatedClient.setUsername(clientDetails.getUsername());
            updatedClient.setPhone(clientDetails.getPhone());
            updatedClient.setEmail(clientDetails.getEmail());

            // Only encode the password if it is provided
            if (clientDetails.getPassword() != null && !clientDetails.getPassword().isEmpty()) {
                updatedClient.setPassword(passwordEncoder.encode(clientDetails.getPassword()));
            }

            return clientRepository.save(updatedClient);
        }
        return null;
    }

    // Delete a client
    public void deleteClient(Long id) {
        clientRepository.deleteById((long) Math.toIntExact(id));
    }
}
