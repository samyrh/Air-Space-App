package ma.spacebnb.userservice.dao.repositories;

import ma.spacebnb.userservice.dao.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    User findByEmail(String email);
}