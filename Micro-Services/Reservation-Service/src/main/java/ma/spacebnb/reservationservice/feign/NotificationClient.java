package ma.spacebnb.reservationservice.feign;

import ma.spacebnb.reservationservice.dao.dto.NotificationRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "notification-service", url = "http://localhost:5566/api/notification")
public interface NotificationClient {

    @PostMapping("/guest/host/add")
    void sendNotificationFromGuestToHost(@RequestBody NotificationRequest notificationRequest);
}