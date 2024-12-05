package ma.spacebnb.reviewservice.dao.enums;


public enum Rating {

    ONE(1, "1 Star"),
    TWO(2, "2 Stars"),
    THREE(3, "3 Stars"),
    FOUR(4, "4 Stars"),
    FIVE(5, "5 Stars");

    private final int ratingValue;
    private final String ratingDescription;

    // Constructor
    Rating(int ratingValue, String ratingDescription) {
        this.ratingValue = ratingValue;
        this.ratingDescription = ratingDescription;
    }

    // Get the rating value (1, 2, 3, 4, 5)
    public int getRatingValue() {
        return ratingValue;
    }

    // Get the description of the rating (e.g., "1 Star", "2 Stars")
    public String getRatingDescription() {
        return ratingDescription;
    }

    // Find Rating by value
    public static Rating getByValue(int value) {
        for (Rating rating : values()) {
            if (rating.ratingValue == value) {
                return rating;
            }
        }
        throw new IllegalArgumentException("Unknown rating value: " + value);
    }

    // Override toString to return the rating description
    @Override
    public String toString() {
        return ratingDescription;
    }

    // Method to check if rating value is valid (useful for validation purposes)
    public static boolean isValidRating(int value) {
        for (Rating rating : values()) {
            if (rating.ratingValue == value) {
                return true;
            }
        }
        return false;
    }
}
