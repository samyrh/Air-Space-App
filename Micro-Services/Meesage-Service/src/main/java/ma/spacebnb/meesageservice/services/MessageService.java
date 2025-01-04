package ma.spacebnb.meesageservice.services;


import ma.spacebnb.meesageservice.dao.entity.Message;
import ma.spacebnb.meesageservice.dao.repository.MessageRepo;
import ma.spacebnb.meesageservice.dto.Host;
import ma.spacebnb.meesageservice.feignclients.HostGuestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class MessageService {


    @Autowired
    private MessageRepo messageRepo;
    @Autowired
    private HostGuestClient hostGuestClient;

    public Message createMessageFromGuestToHost(String message, Long hostId, Long guestId) {
        Message msg = new Message();
        msg.setContent(message);
        msg.setSendDate(new Date());
        msg.setSenderId(guestId);
        msg.setRecipientId(hostId);
        return messageRepo.save(msg); // Save and return the created Message
    }

    public List<Host> getHostsByGuestId(Long guestId) {
        // Find all messages where the guest is either the sender or recipient
        List<Message> messagesBySender = messageRepo.findMessagesBySenderId(guestId);
        List<Message> messagesByRecipient = messageRepo.findMessagesByRecipientId(guestId);

        // Collect all unique hostIds (hostId will either be sender or recipient)
        List<Long> hostIds = messagesBySender.stream()
                .map(Message::getRecipientId) // The recipient is the host when the guest is the sender
                .collect(Collectors.toList());

        hostIds.addAll(messagesByRecipient.stream()
                .map(Message::getSenderId) // The sender is the host when the guest is the recipient
                .toList());

        // Remove duplicates (since a guest can message the same host multiple times)
        hostIds = hostIds.stream().distinct().collect(Collectors.toList());

        // Use Feign Client to fetch host details from the Host microservice
        // Assuming getHostById returns a ResponseEntity<Map<String, Host>>
        List<Host> hosts = hostIds.stream()
                .map(hostId -> {
                    // Call Feign Client for each hostId
                    ResponseEntity<Map<String, Host>> response = hostGuestClient.getHostById(hostId);

                    if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                        Map<String, Host> responseBody = response.getBody();
                        return responseBody.get("host"); // Extract host from the map
                    } else {
                        // Return null or log an error if the host is not found
                        return null;
                    }
                })
                .filter(Objects::nonNull) // Filter out null values (failed responses)
                .collect(Collectors.toList());

        return hosts;
    }

}
