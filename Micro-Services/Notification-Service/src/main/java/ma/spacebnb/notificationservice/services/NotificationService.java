package ma.spacebnb.notificationservice.services;

import ma.spacebnb.notificationservice.dao.entity.Notification;
import ma.spacebnb.notificationservice.dao.repository.NotificationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepo notificationRepository;

    public void createNotification(Long guestId, Long propertyId, String message) {
        Notification notification = new Notification();
        notification.setGuestId(guestId);
        notification.setPropertyId(propertyId);
        notification.setMessage(message);
        notification.setSendDate(new Date());

        notificationRepository.save(notification);
    }
}
