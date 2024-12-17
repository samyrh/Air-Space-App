package ma.xproce.springsecurity.dao.repositories;

import ma.xproce.springsecurity.dao.entity.Guest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestRepository extends JpaRepository<Guest, Long> {


    Guest findByUsername(String username);



    // Method to find a client by email
    Guest findByEmail(String email);

    // Method to find a client by phone number
    Guest findByPhone(String phone);
}
