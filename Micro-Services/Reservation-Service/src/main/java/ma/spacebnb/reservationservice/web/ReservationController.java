package ma.spacebnb.reservationservice.web;


import feign.Client;
import ma.spacebnb.reservationservice.dao.dto.BookingRequest;
import ma.spacebnb.reservationservice.dao.dto.Host;
import ma.spacebnb.reservationservice.dao.dto.NotificationRequest;
import ma.spacebnb.reservationservice.dao.entity.Reservation;
import ma.spacebnb.reservationservice.dao.repository.ReservationRepo;
import ma.spacebnb.reservationservice.dao.enums.ReservationStatus;
import ma.spacebnb.reservationservice.feign.HostClient;
import ma.spacebnb.reservationservice.feign.MessageClient;
import ma.spacebnb.reservationservice.feign.NotificationClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/booking")
@CrossOrigin("*")
public class ReservationController {


    @Autowired
    private ReservationRepo reservationRepo;
    @Autowired
    private NotificationClient notificationClient;
    @Autowired
    private MessageClient messageClient;
    @Autowired
    private HostClient hostClient;
    @Autowired
    private Client feignClient;


    @PostMapping("/add")
    public ResponseEntity<String> addBooking(@RequestBody BookingRequest bookingRequest) {

        // Create a new booking object
        Reservation booking = new Reservation();
        booking.setStartDate(bookingRequest.getStartDate());
        booking.setEndDate(bookingRequest.getEndDate());
        booking.setNumberOfGuests(bookingRequest.getNumberOfGuests());
        booking.setTotalAmount(bookingRequest.getTotalPrice());
        booking.setUserId(bookingRequest.getGuestId());
        booking.setPropertyId(bookingRequest.getPropertyId());
        booking.setStatus(ReservationStatus.PENDING);

        // Save the booking to the database
        reservationRepo.save(booking);

        // Create the notification request
        NotificationRequest notificationRequest = new NotificationRequest();
        notificationRequest.setGuestId(bookingRequest.getGuestId());
        notificationRequest.setPropertyId(bookingRequest.getPropertyId());
        notificationRequest.setMessage("Your booking is pending from "
                + bookingRequest.getStartDate() + " to " + bookingRequest.getEndDate()
                + ". Total price: " + bookingRequest.getTotalPrice() + " $. Please await confirmation.");

        // Send notification to the Notification microservice
        notificationClient.sendNotificationFromGuestToHost(notificationRequest);

        // Create a message from the guest to the host
        try {
            String messageContent = "Hello, I’m interested in booking your property from "
                    + bookingRequest.getStartDate() + " to " + bookingRequest.getEndDate()
                    + ". Is this property still available?";


            messageClient.createMessageFromGuestToHost(
                    messageContent,
                    bookingRequest.getHostId(),
                    bookingRequest.getGuestId()
            );
        } catch (Exception e) {
            System.err.println("Failed to send message: " + e.getMessage());
            return new ResponseEntity<>("Booking created, but failed to send message", HttpStatus.CREATED);
        }

        // Return a success response
        return new ResponseEntity<>("Booking successfully created and message sent", HttpStatus.CREATED);
    }

}
