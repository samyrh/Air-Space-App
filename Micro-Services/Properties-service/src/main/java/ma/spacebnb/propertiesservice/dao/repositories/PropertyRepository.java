package ma.spacebnb.propertiesservice.dao.repositories;

import ma.spacebnb.propertiesservice.dao.entities.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {


}
