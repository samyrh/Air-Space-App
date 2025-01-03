package ma.spacebnb.meesageservice.dao.repository;

import ma.spacebnb.meesageservice.dao.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepo extends JpaRepository<Message, Long> {

    List<Message> findBySenderId(long id);

    List<Message> findMessagesBySenderIdAndRecipientId(Long senderId, Long recipientId);

    List<Message> findMessagesByRecipientIdAndSenderId(Long recipientId, Long senderId);
    // Find messages by senderId (Guest) and recipientId (Host)
    List<Message> findBySenderId(Long senderId);
    // Find all hosts who exchanged messages with a given guest
    @Query("SELECT DISTINCT m.recipientId FROM Message m WHERE m.senderId = :guestId")
    List<Long> findAllHostsByGuestId(Long guestId);

    @Query("SELECT DISTINCT m.senderId FROM Message m WHERE m.recipientId = :guestId")
    List<Long> findAllHostsByGuestIdAsRecipient(Long guestId);
}
