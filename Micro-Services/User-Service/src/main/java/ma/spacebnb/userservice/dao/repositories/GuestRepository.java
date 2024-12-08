package ma.spacebnb.userservice.dao.repositories;

import ma.spacebnb.userservice.dao.entities.Guest;
import org.springframework.data.repository.CrudRepository;

public interface GuestRepository extends CrudRepository<Guest, Long> {
}
