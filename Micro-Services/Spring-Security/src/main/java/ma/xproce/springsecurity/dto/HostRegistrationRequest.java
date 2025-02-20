package ma.xproce.springsecurity.dto;

import java.util.List;

public class HostRegistrationRequest {
    private Long guestId; // ID of the guest to be converted
    private String bio; // About the host
    private String profileImage; // Optional profile image
    private List<String> highlights; // Host highlights
    private List<String> hostDetails; // Host details
    private int years; // Years of hosting experience
    private int months; // Months of hosting experience


    public Long getGuestId() {
        return guestId;
    }

    public void setGuestId(Long guestId) {
        this.guestId = guestId;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public List<String> getHighlights() {
        return highlights;
    }

    public void setHighlights(List<String> highlights) {
        this.highlights = highlights;
    }

    public List<String> getHostDetails() {
        return hostDetails;
    }

    public void setHostDetails(List<String> hostDetails) {
        this.hostDetails = hostDetails;
    }

    public int getYears() {
        return years;
    }

    public void setYears(int years) {
        this.years = years;
    }

    public int getMonths() {
        return months;
    }

    public void setMonths(int months) {
        this.months = months;
    }
}

