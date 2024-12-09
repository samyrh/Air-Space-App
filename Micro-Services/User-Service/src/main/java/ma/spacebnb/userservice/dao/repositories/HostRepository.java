package ma.spacebnb.userservice.dao.repositories;

import ma.spacebnb.userservice.dao.entities.Host;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HostRepository extends JpaRepository<Host, Long> {
}
