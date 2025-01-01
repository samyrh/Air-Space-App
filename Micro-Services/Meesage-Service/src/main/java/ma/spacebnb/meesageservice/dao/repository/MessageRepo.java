package ma.spacebnb.meesageservice.dao.repository;

import ma.spacebnb.meesageservice.dao.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepo extends JpaRepository<Message, Long> {

    List<Message> findBySenderId(long id);
}
