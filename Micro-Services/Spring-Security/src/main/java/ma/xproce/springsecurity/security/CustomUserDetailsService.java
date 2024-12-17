package ma.xproce.springsecurity.security;

<<<<<<< HEAD:Micro-Services/Spring-Security/src/main/java/ma/xproce/springsecurity/security/CustomUserDetailsService.java
import ma.xproce.springsecurity.dao.entity.Guest;
import ma.xproce.springsecurity.dao.repositories.GuestRepository;
=======
import ma.spacebnb.userservice.dao.repositories.UserRepository;
>>>>>>> 50b71681526f4b70574aec79fb5b165cd5ea22e8:Micro-Services/User-Service/src/main/java/ma/spacebnb/userservice/security/CustomUserDetailsService.java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private GuestRepository guestRepository;

    @Override
<<<<<<< HEAD:Micro-Services/Spring-Security/src/main/java/ma/xproce/springsecurity/security/CustomUserDetailsService.java
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Guest client = guestRepository.findByUsername(username);
        if (client == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return org.springframework.security.core.userdetails.User
                .withUsername(client.getUsername())
                .password(client.getPassword())
                .roles("GUEST") // Ensure the correct role is set
                .build();
=======
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        ma.spacebnb.userservice.dao.entities.User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        return new User(
                user.getEmail(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(user.getRole()))
        );
>>>>>>> 50b71681526f4b70574aec79fb5b165cd5ea22e8:Micro-Services/User-Service/src/main/java/ma/spacebnb/userservice/security/CustomUserDetailsService.java
    }
}
