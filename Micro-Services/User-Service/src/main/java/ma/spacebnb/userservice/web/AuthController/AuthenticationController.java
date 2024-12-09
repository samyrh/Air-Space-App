package ma.spacebnb.userservice.web.AuthController;

import ma.spacebnb.userservice.security.CustomUserDetailsService;
import ma.spacebnb.userservice.security.JwtUtil;
import ma.spacebnb.userservice.services.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Adjust for your frontend URL
public class AuthenticationController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    @Autowired
    private UserService userService;


    /**
     * Authenticate and generate JWT token.
     */
    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            User user = userRepository.findByUsername(username);
            if (user == null) {
                return ResponseEntity.badRequest().body("User not found");
            }

            // Add custom claims
            Map<String, Object> customClaims = new HashMap<>();
            customClaims.put("role", user.getRole());
            customClaims.put("email", user.getEmail());

            String jwtToken = jwtUtil.generateToken(username, user.getId(), customClaims);

            return ResponseEntity.ok(Map.of("jwt", jwtToken));

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Invalid credentials. Please try again.");
        }
    }

    /**
     * Register a new Guest.
     */
    @PostMapping("/register/guest")
    public ResponseEntity<String> registerGuest(@RequestBody User user) {
        try {
            // Register the guest directly using the User object
            userService.registerGuest(user);
            return new ResponseEntity<>("Guest registered successfully", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            // Return a bad request if validation fails (e.g., existing username/email/phone)
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            // Handle any other errors
            return new ResponseEntity<>("Registration failed. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
