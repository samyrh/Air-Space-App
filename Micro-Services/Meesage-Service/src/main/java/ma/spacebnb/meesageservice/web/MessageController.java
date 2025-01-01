package ma.spacebnb.meesageservice.web;


import ma.spacebnb.meesageservice.dao.entity.Message;
import ma.spacebnb.meesageservice.dao.repository.MessageRepo;
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

    @PostMapping("/guest/host/add")
    public ResponseEntity<?> createMessageFromGuestToHost(@RequestParam String message,
                                                          @RequestParam Long hostId,
                                                          @RequestParam Long guestId) {
        try {
            // Call the service to create and save the message
            Message createdMessage = messageService.createMessageFromGuestToHost(message, hostId, guestId);

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


}
