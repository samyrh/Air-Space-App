package ma.spacebnb.userservice.dao.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Guest extends User {


    @ElementCollection
    private List<Long> idsWishlist = new ArrayList<>();

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] idImageFront;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] idImageBack;

}
