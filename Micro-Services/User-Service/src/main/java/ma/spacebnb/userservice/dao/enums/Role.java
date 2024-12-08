package ma.spacebnb.userservice.dao.enums;

import lombok.Getter;
import lombok.Setter;

@Getter
public enum Role {
    HOST("Host", "Can list properties and manage bookings."),
    GUEST("Guest", "Can book properties and leave reviews.");

    // Getter for display name
    private final String displayName;
    // Getter for description
    private final String description;

    // Constructor
    Role(String displayName, String description) {
        this.displayName = displayName;
        this.description = description;
    }

    // Method to check if the role has property management permissions
    public boolean canManageProperties() {
        return this == HOST;
    }

    // Method to check if the role can book properties
    public boolean canBookProperties() {
        return this == GUEST;
    }

    // Method to get role by display name
    public static Role fromDisplayName(String displayName) {
        for (Role role : Role.values()) {
            if (role.displayName.equalsIgnoreCase(displayName)) {
                return role;
            }
        }
        throw new IllegalArgumentException("No role found with display name: " + displayName);
    }

    // Override toString for more readable output
    @Override
    public String toString() {
        return String.format("%s (%s)", displayName, description);
    }
}
