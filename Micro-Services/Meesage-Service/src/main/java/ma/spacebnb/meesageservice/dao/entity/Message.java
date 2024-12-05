package ma.spacebnb.meesageservice.dao.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;


@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Date sendDate;


    private Long senderId;


    private Long recipientId;
}
