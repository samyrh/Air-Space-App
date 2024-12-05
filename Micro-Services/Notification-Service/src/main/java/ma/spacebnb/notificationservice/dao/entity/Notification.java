package ma.spacebnb.notificationservice.dao.entity;
import jakarta.persistence.*;
import lombok.*;
import ma.spacebnb.notificationservice.dao.enums.NotificationStatus;

import java.util.Date;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String message;


    private NotificationStatus status;

    @Column(nullable = false)
    private Date sendDate;


    private Long senderId;


    private Long recipientId;

}
