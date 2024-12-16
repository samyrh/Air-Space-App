package ma.spacebnb.userservice.services.User;


import ma.spacebnb.userservice.dao.entities.Guest;
import ma.spacebnb.userservice.dao.entities.Host;
import ma.spacebnb.userservice.dao.entities.User;
import ma.spacebnb.userservice.dao.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void registerUser(User user, String role) {
        if ("GUEST".equalsIgnoreCase(role)) {
            Guest guest = new Guest();
            populateUserDetails(user, guest);
            userRepository.save(guest);
        } else if ("HOST".equalsIgnoreCase(role)) {
            Host host = new Host();
            populateUserDetails(user, host);
            userRepository.save(host);
        } else {
            throw new IllegalArgumentException("Invalid role: " + role);
        }
    }

    private void populateUserDetails(User source, User target) {
        target.setFirstName(source.getFirstName());
        target.setLastName(source.getLastName());
        target.setEmail(source.getEmail());
        target.setPhoneNumber(source.getPhoneNumber());
        target.setPassword(passwordEncoder.encode(source.getPassword()));
    }
}
