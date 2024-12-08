package ma.spacebnb.userservice.dao.enums;


import lombok.Getter;

@Getter
public enum Role {
    HOST("Host", "Can list properties and manage bookings."),
    GUEST("Guest", "Can book properties and leave reviews.");

    private final String displayName;
    private final String description;

    Role(String displayName, String description) {
        this.displayName = displayName;
        this.description = description;
    }

    // Additional authorization checks can be added here as needed
    public boolean canManageProperties() {
        return this == HOST;
    }

    public boolean canBookProperties() {
        return this == GUEST;
    }
}
