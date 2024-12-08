package ma.spacebnb.userservice.dao.entities;

import jakarta.persistence.*;
import lombok.*;
import ma.spacebnb.userservice.dao.enums.Role;

import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Host extends User {


    private int propertyLimit;

    @ElementCollection
    private List<Long> idsProperties = new ArrayList<>();

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] idImageFront;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] idImageBack;

    public void setPropertyLimit(int propertyLimit) {
        this.propertyLimit = propertyLimit;
    }
}