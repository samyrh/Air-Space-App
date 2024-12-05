package ma.spacebnb.reviewservice.dao.entity;


import jakarta.persistence.*;
import lombok.*;
import ma.spacebnb.reviewservice.dao.enums.Rating;

import java.util.Date;

@Entity
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private Rating rating;

    private String comment;

    @Column(nullable = false)
    private Date publishDate;


    private Long reviewerId;


    private Long propertyId;
}
