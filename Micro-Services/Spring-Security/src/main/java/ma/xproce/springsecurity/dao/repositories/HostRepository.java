package ma.xproce.springsecurity.dao.repositories;

import ma.xproce.springsecurity.dao.entity.Host;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HostRepository extends JpaRepository<Host, String> {


    Optional<Host> findByRefHost(String ref);
}
