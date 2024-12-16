package ma.spacebnb.userservice.web.AuthController;

import ma.spacebnb.userservice.dao.entities.User;
import ma.spacebnb.userservice.dao.repositories.UserRepository;
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
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            User user = userRepository.findByEmail(email);
            if (user == null) {
                return ResponseEntity.badRequest().body("User not found");
            }

            // Add custom claims
            Map<String, Object> customClaims = new HashMap<>();
            customClaims.put("role", user.getRole());
            customClaims.put("email", user.getEmail());

            String jwtToken = jwtUtil.generateToken(email, customClaims);

            return ResponseEntity.ok(Map.of("jwt", jwtToken));

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Invalid credentials. Please try again.");
        }
    }

    /**
     * Register a new Guest.
     */
    @PostMapping("/register/{role}")
    public ResponseEntity<String> registerUser(@RequestBody User user, @PathVariable String role) {
        try {
            userService.registerUser(user, role);
            return ResponseEntity.status(HttpStatus.CREATED).body(role + " registered successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed. Please try again.");
        }
    }


}
