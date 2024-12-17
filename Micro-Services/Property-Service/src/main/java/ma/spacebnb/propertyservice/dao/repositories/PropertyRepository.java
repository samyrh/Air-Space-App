package ma.spacebnb.propertyservice.dao.repositories;

import ma.spacebnb.propertyservice.dao.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface PropertyRepository extends JpaRepository<Property, Long> {
}
