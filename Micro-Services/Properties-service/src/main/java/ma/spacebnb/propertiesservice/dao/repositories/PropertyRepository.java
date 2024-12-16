package ma.spacebnb.propertiesservice.dao.repositories;

import ma.spacebnb.propertiesservice.dao.entities.Property;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyRepository extends JpaRepository<Property, Long> {
}
