package ma.spacebnb.meesageservice.web;


import ma.spacebnb.meesageservice.dao.entity.Message;
import ma.spacebnb.meesageservice.dao.repository.MessageRepo;
import ma.spacebnb.meesageservice.dto.Host;
import ma.spacebnb.meesageservice.dto.NotificationRequest;
import ma.spacebnb.meesageservice.feignclients.NotificationClient;
import ma.spacebnb.meesageservice.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/message")
@CrossOrigin("*")
public class MessageController {

    @Autowired
    private MessageService messageService;
    @Autowired
    private MessageRepo messageRepo;
    @Autowired
    private NotificationClient notificationClient;

    @PostMapping("/guest/host/add")
    public ResponseEntity<?> createMessageFromGuestToHost(@RequestParam String message,
                                                          @RequestParam Long hostId,
                                                          @RequestParam Long guestId) {
        try {
            // Call the service to create and save the message
            Message createdMessage = messageService.createMessageFromGuestToHost(message, hostId, guestId);
            // Create the notification request
            NotificationRequest notificationRequest = new NotificationRequest();
            notificationRequest.setGuestId(guestId);
            notificationRequest.setHostId(hostId);
            notificationRequest.setMessage("A Guest has sent you a message.");

            // Send notification to the Notification microservice
            notificationClient.sendNotificationFromGuestToHost(notificationRequest);

            // Return a response with the created message
            return ResponseEntity.status(HttpStatus.CREATED).body(createdMessage);
        } catch (Exception e) {
            // Handle exceptions and return an error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating message: " + e.getMessage());
        }
    }






    @GetMapping("/sender/{id}")
    public ResponseEntity<List<Message>> getMessagesBySenderId(@PathVariable long id) {
        List<Message> messages = messageRepo.findBySenderId(id);
        if (messages.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);  // 204 if no messages are found
        }
        return new ResponseEntity<>(messages, HttpStatus.OK);  // 200 with list of messages
    }


    @GetMapping("/messages/guest/{guestId}/host/{hostId}")
    public ResponseEntity<List<Message>> getMessagesByGuestAndHost(
            @PathVariable("guestId") Long guestId, @PathVariable("hostId") Long hostId) {
        List<Message> messages = messageRepo.findMessagesBySenderIdAndRecipientId(guestId, hostId);
        if (messages.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);  // 204 if no messages found
        }
        return new ResponseEntity<>(messages, HttpStatus.OK);  // 200 with list of messages
    }

    @GetMapping("/messages/host/{hostId}/guest/{guestId}")
    public ResponseEntity<List<Message>> getMessagesByHostAndGuest(
            @PathVariable("hostId") Long hostId, @PathVariable("guestId") Long guestId) {
        List<Message> messages = messageRepo.findMessagesBySenderIdAndRecipientId(hostId, guestId);
        if (messages.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);  // 204 if no messages found
        }
        return new ResponseEntity<>(messages, HttpStatus.OK);  // 200 with list of messages
    }

    // Get all hosts a guest has communicated with
    @GetMapping("/guest/{guestId}/hosts")
    public ResponseEntity<List<Long>> getAllHostsForGuest(@PathVariable Long guestId) {
        try {
            // Fetch all host IDs where guest is the sender
            List<Long> hostsAsSender = messageRepo.findAllHostsByGuestId(guestId);

            // Fetch all host IDs where guest is the recipient
            List<Long> hostsAsRecipient = messageRepo.findAllHostsByGuestIdAsRecipient(guestId);

            // Merge the lists and remove duplicates (if any)
            hostsAsSender.addAll(hostsAsRecipient);
            List<Long> uniqueHosts = hostsAsSender.stream().distinct().toList();

            return ResponseEntity.ok(uniqueHosts);  // Return the unique host IDs
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/guest/{guestId}/host")
    public ResponseEntity<List<Host>> getAllHostForGuest(@PathVariable Long guestId) {
        try {
            // Call the service method to fetch hosts
            List<Host> hosts = messageService.getHostsByGuestId(guestId);

            if (hosts.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);  // 204 if no hosts found
            }

            return new ResponseEntity<>(hosts, HttpStatus.OK);  // 200 with list of hosts

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);  // 500 if error occurs
        }
    }
}
