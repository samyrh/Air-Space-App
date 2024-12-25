package ma.xproce.springsecurity.dao.repositories;

import ma.xproce.springsecurity.dao.entity.Host;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HostRepository extends JpaRepository<Host, String> {



}
