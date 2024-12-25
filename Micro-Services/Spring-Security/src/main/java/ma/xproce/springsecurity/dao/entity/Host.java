package ma.xproce.springsecurity.dao.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Host {

    @Id
    @Column(length = 50) // Optional: Specify length for UUID, typically 36 chars
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false, unique = true)
    private String phone;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private boolean isSuperHost;
    private boolean isVerified;
    private String about;
    private int ratingCount;
    private double ratingAverage;
    private String profileImage;
    @ElementCollection
    @CollectionTable(name = "host_highlights", joinColumns = @JoinColumn(name = "host_id"))
    @Column(name = "highlight")
    private List<String> highlights;

    @ElementCollection
    @CollectionTable(name = "host_details", joinColumns = @JoinColumn(name = "host_id"))
    @Column(name = "detail")
    private List<String> hostDetails;

    @Embedded
    private TimeAsHost timeAsHost;

    public static class TimeAsHost {
        private int years;
        private int months;

        public int getYears() {
            return years;
        }

        public int getMonths() {
            return months;
        }

        public void setYears(int years) {
            this.years = years;
        }

        public void setMonths(int months) {
            this.months = months;
        }
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getUsername() {
        return username;
    }

    public String getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public boolean isSuperHost() {
        return isSuperHost;
    }

    public boolean isVerified() {
        return isVerified;
    }

    public String getAbout() {
        return about;
    }

    public int getRatingCount() {
        return ratingCount;
    }

    public double getRatingAverage() {
        return ratingAverage;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public List<String> getHighlights() {
        return highlights;
    }

    public List<String> getHostDetails() {
        return hostDetails;
    }

    public TimeAsHost getTimeAsHost() {
        return timeAsHost;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setSuperHost(boolean superHost) {
        isSuperHost = superHost;
    }

    public void setVerified(boolean verified) {
        isVerified = verified;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public void setRatingCount(int ratingCount) {
        this.ratingCount = ratingCount;
    }

    public void setRatingAverage(double ratingAverage) {
        this.ratingAverage = ratingAverage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public void setHighlights(List<String> highlights) {
        this.highlights = highlights;
    }

    public void setHostDetails(List<String> hostDetails) {
        this.hostDetails = hostDetails;
    }

    public void setTimeAsHost(TimeAsHost timeAsHost) {
        this.timeAsHost = timeAsHost;
    }
}
