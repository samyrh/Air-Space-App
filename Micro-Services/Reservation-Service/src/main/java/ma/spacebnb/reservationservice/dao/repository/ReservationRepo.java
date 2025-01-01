package ma.spacebnb.reservationservice.dao.repository;


import ma.spacebnb.reservationservice.dao.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepo extends JpaRepository<Reservation, Long> {
}
