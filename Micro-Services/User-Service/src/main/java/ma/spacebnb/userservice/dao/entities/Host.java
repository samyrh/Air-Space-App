package ma.spacebnb.userservice.dao.entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Host extends User {


    private int propertyLimit;

    @ElementCollection
    private List<Long> idsProperties = new ArrayList<>();

    @Lob
    private byte[] idImageFront;

    @Lob
    private byte[] idImageBack;

}
