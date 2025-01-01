package ma.spacebnb.meesageservice.services;


import ma.spacebnb.meesageservice.dao.entity.Message;
import ma.spacebnb.meesageservice.dao.repository.MessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class MessageService {


    @Autowired
    private MessageRepo messageRepo;


    public Message createMessageFromGuestToHost(String message, Long hostId, Long guestId) {
        Message msg = new Message();
        msg.setContent(message);
        msg.setSendDate(new Date());
        msg.setSenderId(guestId);
        msg.setRecipientId(hostId);
        return messageRepo.save(msg); // Save and return the created Message
    }
}
