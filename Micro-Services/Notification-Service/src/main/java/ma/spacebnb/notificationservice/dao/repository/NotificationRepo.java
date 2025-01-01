package ma.spacebnb.notificationservice.dao.repository;

import ma.spacebnb.notificationservice.dao.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepo extends JpaRepository<Notification, Long> {
}
