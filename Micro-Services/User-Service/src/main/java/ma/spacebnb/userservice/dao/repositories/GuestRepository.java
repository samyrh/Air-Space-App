package ma.spacebnb.userservice.dao.repositories;

import ma.spacebnb.userservice.dao.entities.Guest;
import ma.spacebnb.userservice.dao.entities.Host;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface GuestRepository extends CrudRepository<Guest, Long> {

    Guest findByUsername(String username);

    Guest findByEmail(String email);

    Guest findByPhoneNumber(String phoneNumber);

    Guest findGuestByPassword(String password);

}
