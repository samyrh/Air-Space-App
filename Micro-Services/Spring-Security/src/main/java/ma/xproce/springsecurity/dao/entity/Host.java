package ma.xproce.springsecurity.dao.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Host {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "host_id")
    private Long id;

    @Column(name = "ref_host", nullable = false)
    private String refHost = UUID.randomUUID().toString();

    private String name;

    private String username;

    @Column(nullable = true)
    private String phone;

    @Column(nullable = true)
    private String email;

    private String password;

    private boolean isSuperHost;
    private boolean isVerified;

    @Column(nullable = true, length = 5000)
    private String about;

    private int ratingCount;
    private double ratingAverage;

    private String profileImage;

    // ElementCollection for highlights and host details
    @ElementCollection
    @CollectionTable(name = "host_highlights", joinColumns = @JoinColumn(name = "host_id"))
    private List<String> highlights;

    @ElementCollection
    @CollectionTable(name = "host_details", joinColumns = @JoinColumn(name = "host_id"))
    private List<String> hostDetails;

    @Embedded
    private TimeAsHost timeAsHost;

    @Setter
    @Getter
    public static class TimeAsHost {
        private int years;
        private int months;
    }
}
