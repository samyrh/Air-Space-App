package ma.spacebnb.reservationservice.dao.entity;

import jakarta.persistence.*;
import lombok.*;
import ma.spacebnb.reservationservice.dao.enums.ReservationStatus;

import java.util.Date;

@Entity
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Date startDate;

    @Column(nullable = false)
    private Date endDate;

    @Column(nullable = false)
    private Integer numberOfGuests;


    private ReservationStatus status;

    @Column(nullable = false)
    private Double totalAmount;

    private String cancellationMessage;


    private Long userId;

    private Long propertyId;
}
