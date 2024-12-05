package ma.spacebnb.propertyservice.dao.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String description;

    @Column(nullable = false)
    private String address;

    private String city;

    private Double pricePerNight;

    private Integer capacity;

    private Double area;

    private String type;

    @Lob
    @CollectionTable(name = "property_images", joinColumns = @JoinColumn(name = "property_id"))
    @Column(name = "image", columnDefinition = "LONGBLOB")
    private List<byte[]> images;

    private String availability;

    private String status;


    private Long hostId;

}
