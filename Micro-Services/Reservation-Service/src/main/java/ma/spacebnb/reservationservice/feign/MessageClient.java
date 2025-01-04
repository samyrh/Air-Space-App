package ma.spacebnb.reservationservice.feign;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "message-service", url = "http://localhost:5659/api/message")
public interface MessageClient {
    @PostMapping("/guest/host/add")
    public ResponseEntity<?> createMessageFromGuestToHost(@RequestParam String message,
                                                          @RequestParam Long hostId,
                                                          @RequestParam Long guestId);
}
