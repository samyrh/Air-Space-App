package ma.spacebnb.userservice.dao.entities;

import jakarta.persistence.*;
import lombok.*;
import ma.spacebnb.userservice.dao.enums.Role;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Entity
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class User {


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String name;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date lastLoginDate;

    private boolean isActive;

    @ElementCollection
    private List<Long> idsProperties = new ArrayList<>();

    @ElementCollection
    private List<Long> idsReservations = new ArrayList<>();

    @ElementCollection
    private List<Long> notifications = new ArrayList<>();

    @ElementCollection
    private List<Long> idsSentMessages = new ArrayList<>();

    @ElementCollection
    private List<Long> idsReceivedMessages = new ArrayList<>();

}
