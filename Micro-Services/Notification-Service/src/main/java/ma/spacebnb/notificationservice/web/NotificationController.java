package ma.spacebnb.notificationservice.web;


import ma.spacebnb.notificationservice.dao.entity.Notification;
import ma.spacebnb.notificationservice.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notification")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/guest/host/add")
    public void sendNotificationFromGuestToHost(@RequestBody Notification notificationRequest) {
        notificationService.createNotification(notificationRequest.getGuestId(), notificationRequest.getPropertyId(), notificationRequest.getMessage());
    }
}
