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
@Builder
public class User {


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String phoneNumber;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String country;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, updatable = false)
    @Builder.Default
    private Date creationDate = new Date();


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
