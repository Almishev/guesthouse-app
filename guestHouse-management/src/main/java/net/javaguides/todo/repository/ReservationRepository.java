package net.javaguides.todo.repository;

import net.javaguides.todo.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByCheckInDateLessThanEqualAndCheckOutDateGreaterThanEqual(
            LocalDate checkOutEndDate, LocalDate checkInStartDate);


    @Query("SELECT r FROM Reservation r " +
            "WHERE (:checkInDate BETWEEN r.checkInDate AND r.checkOutDate " +
            "OR :checkOutDate BETWEEN r.checkInDate AND r.checkOutDate) " +
            "AND r.id <> :reservationIdToExclude")
    List<Reservation> findOverlappingReservations(@Param("checkInDate") LocalDate checkInDate,
                                                  @Param("checkOutDate") LocalDate checkOutDate,
                                                  @Param("reservationIdToExclude") Long reservationIdToExclude);
}
