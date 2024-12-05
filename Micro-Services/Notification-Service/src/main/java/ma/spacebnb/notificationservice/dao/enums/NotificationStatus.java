package ma.spacebnb.notificationservice.dao.enums;


import lombok.Getter;

@Getter
public enum NotificationStatus {

    PENDING(1, "PENDING"),
    READ(2, "READ"),
    DELETED(3, "DELETED");

    // Get the ID of the status
    private final int id;
    // Get the name of the status
    private final String statusName;

    // Constructor
    NotificationStatus(int id, String statusName) {
        this.id = id;
        this.statusName = statusName;
    }

    // Find NotificationStatus by id
    public static NotificationStatus getById(int id) {
        for (NotificationStatus status : values()) {
            if (status.id == id) {
                return status;
            }
        }
        throw new IllegalArgumentException("Unknown id: " + id);
    }

    // Find NotificationStatus by name
    public static NotificationStatus getByName(String name) {
        for (NotificationStatus status : values()) {
            if (status.statusName.equalsIgnoreCase(name)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Unknown status name: " + name);
    }

    // Override toString to return the status name
    @Override
    public String toString() {
        return statusName;
    }

    // Method to check if status is valid (useful for validation purposes)
    public static boolean isValidStatus(String statusName) {
        for (NotificationStatus status : values()) {
            if (status.statusName.equalsIgnoreCase(statusName)) {
                return true;
            }
        }
        return false;
    }
}
