package net.javaguides.todo.service;


import net.javaguides.todo.dto.ReservationDto;
import net.javaguides.todo.entity.Reservation;

import java.time.LocalDate;
import java.util.List;

public interface ReservationService {



    List<LocalDate> getAvailableDays(LocalDate startDate, LocalDate endDate);

    public List<ReservationDto> getAllReservations();

    public ReservationDto createReservation(ReservationDto reservationDto);

    ReservationDto getReservation(Long id);

    public void updateReservation(Long reservationId, Reservation updatedReservation);

    public void deleteReservation(Long id);


}
