package ma.spacebnb.userservice.services.User;

import ma.spacebnb.userservice.dao.enums.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserManager{


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void registerGuest(User user) {


        // Check for existing username
        if (userRepository.findByFirstName(user.getFirstName()) != null) {
            ResponseEntity.badRequest().body("Username already exists");
            return;
        }
        if (userRepository.findByLastName(user.getLastName()) != null) {
            ResponseEntity.badRequest().body("Username already exists");
            return;
        }
        // Check for existing email
        if (userRepository.findByEmail(user.getEmail()) != null) {
            ResponseEntity.badRequest().body("Email already exists");
            return;
        }

        // Check for existing phone number
        if (userRepository.findByPhoneNumber(user.getPhoneNumber()) != null) {
            ResponseEntity.badRequest().body("Phone number already exists");
            return;
        }

        // Encode password and set role
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.GUEST);

        try {
            // Save user to the database
            userRepository.save(user);
            ResponseEntity.status(201).body("Guest registered successfully!");
        } catch (Exception e) {
            ResponseEntity.status(500).body("Registration failed. Please try again.");
        }
    }


}
