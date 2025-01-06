package ma.spacebnb.propertiesservice.dao.repositories;

import ma.spacebnb.propertiesservice.dao.entities.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {


    List<Property> findByHostId(String hostId);

    @Query("SELECT p FROM Property p WHERE p.rating IS NOT NULL ORDER BY p.rating DESC")
    List<Property> findTop6ByRating();
}
