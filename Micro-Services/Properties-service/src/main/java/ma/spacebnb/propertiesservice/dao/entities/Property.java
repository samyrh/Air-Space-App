package ma.spacebnb.propertiesservice.dao.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Property {

    @Id
    @Column(length = 36) // Optional: Specify length for UUID, typically 36 chars
    private String id;

    private String title;

    private String name;

    private int bathrooms;
    private int bedrooms;
    private int beds;

    private String metaDescription;
    @Lob
    private String description;


    private double latitude;
    private double longitude;
    private int persons;
    private Double rating;

    private String city;

    private Double pricePerNight;
    private Double cleaningFee;
    private Double serviceFee;

    private String type;

    @ElementCollection
    @CollectionTable(name = "property_images", joinColumns = @JoinColumn(name = "property_id"))
    @Column(name = "image")
    private List<String> images = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "property_availability", joinColumns = @JoinColumn(name = "property_id"))
    @Column(name = "available_date")
    private List<LocalDate> availability = new ArrayList<>(); // Updated field for dates

    @ElementCollection
    @CollectionTable(name = "property_rules", joinColumns = @JoinColumn(name = "property_id"))
    @Column(name = "rules")
    private List<String> rules = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "property_amenities", joinColumns = @JoinColumn(name = "property_id"))
    @Column(name = "amenities")
    private List<String> amenities = new ArrayList<>();


    private String status;

    @Column(length = 60, unique = true)  // Ensure the id is unique, and length of UUID is 36
    private String hostId;

}
