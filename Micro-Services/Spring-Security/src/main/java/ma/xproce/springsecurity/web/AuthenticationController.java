package ma.xproce.springsecurity.web;

import ma.xproce.springsecurity.dao.entity.Guest;
import ma.xproce.springsecurity.dao.entity.Host;
import ma.xproce.springsecurity.dao.repositories.GuestRepository;
import ma.xproce.springsecurity.dao.repositories.HostRepository;
import ma.xproce.springsecurity.dto.HostRegistrationRequest;
import ma.xproce.springsecurity.security.JwtUtil;
import ma.xproce.springsecurity.security.CustomUserDetailsService;
import ma.xproce.springsecurity.services.HostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.authentication.BadCredentialsException;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allow CORS for React frontend
public class AuthenticationController {

    @Autowired
    private GuestRepository clientRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private HostRepository hostRepository;

    @Autowired
    private GuestRepository guestRepository;

    @PostMapping("/authenticate")
    public String createAuthenticationToken(@RequestBody String loginRequest) throws Exception {
        // Extract username and password from the request body
        String[] credentials = loginRequest.split(",");
        String username = credentials[0].split(":")[1].replaceAll("\"", "");
        String password = credentials[1].split(":")[1].replaceAll("\"", "").replaceAll("}", "");

        try {
            // Authenticate the user with the provided credentials
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid credentials, try again", e);
        }

        // Load user details (this is where we fetch the guest details)
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

        // Fetch the guest entity to get the guest ID
        Guest client = clientRepository.findByUsername(username);
        Long guestId = client.getId(); // Retrieve the guest ID from the Guest entity

        // Get the role from the user details (or assign a default role if not found)
        String role = userDetails.getAuthorities().toString(); // This could be more specific based on the actual authorities

        // Generate the JWT token with the guestId
        String jwtToken = jwtUtil.generateToken(userDetails.getUsername(), role, guestId);

        // Return the JWT token with role and guestId in the response
        return "{ \"jwt\": \"" + jwtToken + "\", \"role\": \"" + role + "\", \"guestId\": \"" + guestId + "\" }";
    }


    // Register a new client
    @PostMapping("/register")
    public ResponseEntity<String> registerClient(@RequestBody Guest client) {
        if (clientRepository.findByUsername(client.getUsername()) != null) {
            return new ResponseEntity<>("Username already exists", HttpStatus.BAD_REQUEST);
        }

        if (clientRepository.findByEmail(client.getEmail()) != null) {
            return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
        }

        if (clientRepository.findByPhone(client.getPhone()) != null) {
            return new ResponseEntity<>("Phone number already exists", HttpStatus.BAD_REQUEST);
        }

        String encodedPassword = passwordEncoder.encode(client.getPassword());
        client.setPassword(encodedPassword);

        try {
            clientRepository.save(client);
            return new ResponseEntity<>("Registration successful! You can now log in.", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Registration failed. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Optional: logout endpoint if you need any server-side cleanup (not necessary for JWT)
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Successfully logged out");
    }


    @PostMapping("/converttohost")
    public ResponseEntity<String> convertToHost(@RequestBody HostRegistrationRequest hostRequest) {
        // Check if the Guest exists
        Guest guest = guestRepository.findById(hostRequest.getGuestId())
                .orElseThrow(() -> new RuntimeException("Guest not found"));

        // Convert the Guest to Host
        Host host = new Host();
        host.setName(guest.getName());
        host.setUsername(guest.getUsername());
        host.setPhone(guest.getPhone());
        host.setEmail(guest.getEmail());
        host.setPassword(passwordEncoder.encode(guest.getPassword())); // Encode password
        host.setRefHost(UUID.randomUUID().toString()); // Generate new refHost
        host.setSuperHost(false); // Default value, can be modified
        host.setVerified(false); // Default value, can be modified
        host.setProfileImage(hostRequest.getProfileImage());
        host.setAbout(hostRequest.getBio());
        host.setTimeAsHost(new Host.TimeAsHost());
        host.getTimeAsHost().setYears(hostRequest.getYears());
        host.getTimeAsHost().setMonths(hostRequest.getMonths());

        // Save the Host entity first to generate host_id
        hostRepository.save(host);

        // Now set the highlights and host details only if the host is saved and has a valid host_id
        if (hostRequest.getHighlights() != null && !hostRequest.getHighlights().isEmpty()) {
            host.setHighlights(hostRequest.getHighlights());
        }

        if (hostRequest.getHostDetails() != null && !hostRequest.getHostDetails().isEmpty()) {
            host.setHostDetails(hostRequest.getHostDetails());
        }

        // Save the updated Host entity with highlights and host details
        hostRepository.save(host);

        // Mark the Guest as converted to Host
        guest.setHost(true);
        guestRepository.save(guest);

        // Return success response
        return new ResponseEntity<>("Successfully converted to Host", HttpStatus.CREATED);
    }


}
