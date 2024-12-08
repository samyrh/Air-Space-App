package ma.spacebnb.userservice.dao.repositories;

import ma.spacebnb.userservice.dao.entities.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsername(String username);
}
