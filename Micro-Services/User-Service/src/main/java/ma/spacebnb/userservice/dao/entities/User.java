package ma.spacebnb.userservice.dao.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import ma.spacebnb.userservice.dao.enums.Role;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String phoneNumber;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String country;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, updatable = false)
    @Builder.Default
    private Date creationDate = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    private Date lastLoginDate;

    private boolean isActive;

    @ElementCollection
    private List<Long> idsProperties = new ArrayList<>();

    @ElementCollection
    private List<Long> idsReservations = new ArrayList<>();

    @ElementCollection
    private List<Long> idsnotifications = new ArrayList<>();

    @ElementCollection
    private List<Long> idsSentMessages = new ArrayList<>();

    @ElementCollection
    private List<Long> idsReceivedMessages = new ArrayList<>();

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
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

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Date getLastLoginDate() {
        return lastLoginDate;
    }

    public void setLastLoginDate(Date lastLoginDate) {
        this.lastLoginDate = lastLoginDate;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public List<Long> getIdsProperties() {
        return idsProperties;
    }

    public void setIdsProperties(List<Long> idsProperties) {
        this.idsProperties = idsProperties;
    }

    public List<Long> getIdsReservations() {
        return idsReservations;
    }

    public void setIdsReservations(List<Long> idsReservations) {
        this.idsReservations = idsReservations;
    }

    public List<Long> getIdsnotifications() {
        return idsnotifications;
    }

    public void setIdsnotifications(List<Long> idsnotifications) {
        this.idsnotifications = idsnotifications;
    }

    public List<Long> getIdsSentMessages() {
        return idsSentMessages;
    }

    public void setIdsSentMessages(List<Long> idsSentMessages) {
        this.idsSentMessages = idsSentMessages;
    }

    public List<Long> getIdsReceivedMessages() {
        return idsReceivedMessages;
    }

    public void setIdsReceivedMessages(List<Long> idsReceivedMessages) {
        this.idsReceivedMessages = idsReceivedMessages;
    }
}
