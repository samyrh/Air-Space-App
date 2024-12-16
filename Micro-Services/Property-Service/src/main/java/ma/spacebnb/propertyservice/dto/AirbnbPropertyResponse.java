
package ma.spacebnb.propertyservice.dto;


import java.util.List;

public class AirbnbPropertyResponse {
    private boolean error;
    private List<AirbnbProperty> results;

    public static class AirbnbProperty {
        private String name;
        private String address;
        private String city;
        private String type;
        private double lat;
        private double lng;
        private int persons;
        private int reviewsCount;
        private double rating;
        private String cancelPolicy;
        private List<byte[]> images;
        private Price price;

        public static class Price {
            private String price;// Ensure it aligns with API data

            public String getPrice() {
                return price;
            }

            public void setPrice(String price) {
                this.price = price;
            }
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getAddress() {
            return address;
        }

        public void setAddress(String address) {
            this.address = address;
        }

        public String getCity() {
            return city;
        }

        public void setCity(String city) {
            this.city = city;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public double getLat() {
            return lat;
        }

        public void setLat(double lat) {
            this.lat = lat;
        }

        public double getLng() {
            return lng;
        }

        public void setLng(double lng) {
            this.lng = lng;
        }

        public int getPersons() {
            return persons;
        }

        public void setPersons(int persons) {
            this.persons = persons;
        }

        public int getReviewsCount() {
            return reviewsCount;
        }

        public void setReviewsCount(int reviewsCount) {
            this.reviewsCount = reviewsCount;
        }

        public double getRating() {
            return rating;
        }

        public void setRating(double rating) {
            this.rating = rating;
        }

        public String getCancelPolicy() {
            return cancelPolicy;
        }

        public void setCancelPolicy(String cancelPolicy) {
            this.cancelPolicy = cancelPolicy;
        }

        public Price getPrice() {
            return price;
        }

        public void setPrice(Price price) {
            this.price = price;
        }

        public List<byte[]> getImages() {
            return images;
        }

        public void setImages(List<byte[]> images) {
            this.images = images;
        }
    }

    public boolean isError() {
        return error;
    }

    public void setError(boolean error) {
        this.error = error;
    }

    public List<AirbnbProperty> getResults() {
        return results;
    }

    public void setResults(List<AirbnbProperty> results) {
        this.results = results;
    }
}
