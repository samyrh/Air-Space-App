package ma.spacebnb.reservationservice.dao.enums;



public enum ReservationStatus {

    PENDING(1, "PENDING"),
    CONFIRMED(2, "CONFIRMED"),
    CANCELLED(3, "CANCELLED");

    private final int id;
    private final String statusName;

    // Constructor
    ReservationStatus(int id, String statusName) {
        this.id = id;
        this.statusName = statusName;
    }

    // Get the ID of the status
    public int getId() {
        return id;
    }

    // Get the name of the status
    public String getStatusName() {
        return statusName;
    }

    // Find ReservationStatus by id
    public static ReservationStatus getById(int id) {
        for (ReservationStatus status : values()) {
            if (status.id == id) {
                return status;
            }
        }
        throw new IllegalArgumentException("Unknown id: " + id);
    }

    // Find ReservationStatus by name
    public static ReservationStatus getByName(String name) {
        for (ReservationStatus status : values()) {
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

    // Method to check if status is a valid one (could be useful for validation purposes)
    public static boolean isValidStatus(String statusName) {
        for (ReservationStatus status : values()) {
            if (status.statusName.equalsIgnoreCase(statusName)) {
                return true;
            }
        }
        return false;
    }
}

