package net.javaguides.todo.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.todo.dto.ReservationDto;
import net.javaguides.todo.entity.Reservation;
import net.javaguides.todo.exception.ResourceNotFoundException;
import net.javaguides.todo.repository.ReservationRepository;
import net.javaguides.todo.service.ReservationService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReservationServiceImpl implements ReservationService {


    private ReservationRepository reservationRepository;
    private ModelMapper modelMapper;

    @Override
    public List<LocalDate> getAvailableDays(LocalDate startDate, LocalDate endDate) {
        List<LocalDate> availableDays = new ArrayList<>();

        // Retrieve reservations that overlap with the specified date range
        List<Reservation> overlappingReservations = reservationRepository.findByCheckInDateLessThanEqualAndCheckOutDateGreaterThanEqual(endDate, startDate);

        // Create a set of all dates within the specified range
        Set<LocalDate> dateRange = startDate.datesUntil(endDate.plusDays(1)).collect(Collectors.toSet());

        // Remove dates that are already reserved
        for (Reservation reservation : overlappingReservations) {
            LocalDate checkIn = reservation.getCheckInDate();
            LocalDate checkOut = reservation.getCheckOutDate();

            // Remove dates within the reservation period
            dateRange.removeAll(checkIn.datesUntil(checkOut.plusDays(1)).collect(Collectors.toList()));
        }

        // Add remaining dates to availableDays list
        availableDays.addAll(dateRange);

        return availableDays;
    }


    @Override
    public List<ReservationDto> getAllReservations() {
        List<Reservation> reservations = reservationRepository.findAll();

        return reservations.stream().map((reservation) -> modelMapper.map(reservation, ReservationDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public ReservationDto createReservation(ReservationDto reservationDto) {
        // Map ReservationDto to Reservation entity
        Reservation reservation = modelMapper.map(reservationDto, Reservation.class);

        // Retrieve existing reservations within the provided date range
        List<Reservation> existingReservations = reservationRepository
                .findByCheckInDateLessThanEqualAndCheckOutDateGreaterThanEqual(

                         reservation.getCheckOutDate(), reservation.getCheckInDate());



        // Check for overlapping reservations
        if (!existingReservations.isEmpty()) {
            // Handle overlapping reservations (e.g., throw an exception)
            throw new ResourceNotFoundException("There is already a reservation for the selected date range");
        }

        // Save the reservation
        Reservation savedReservation = reservationRepository.save(reservation);

        // Map saved Reservation entity back to ReservationDto and return
        return modelMapper.map(savedReservation, ReservationDto.class);
    }

    @Override
    public ReservationDto getReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id:" + id));

        return modelMapper.map(reservation, ReservationDto.class);
    }


    public void deleteReservation(Long id) {
        Optional<Reservation> reservationOptional = reservationRepository.findById(id);
        if (reservationOptional.isPresent()) {
            reservationRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("There are no reservation with this id: " + id);
        }
    }

    @Override
    public void updateReservation(Long reservationId, Reservation updatedReservation) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(reservationId);
        if (optionalReservation.isPresent()) {
            Reservation reservation = optionalReservation.get();

            // Check if the new dates are available
            if (areDatesAvailable(updatedReservation.getCheckInDate(), updatedReservation.getCheckOutDate(), reservationId)) {
                // Update the reservation with the new data
                reservation.setUsername(updatedReservation.getUsername());
                reservation.setCheckInDate(updatedReservation.getCheckInDate());
                reservation.setCheckOutDate(updatedReservation.getCheckOutDate());
                reservation.setEmail(updatedReservation.getEmail());
                reservation.setPhone(updatedReservation.getPhone());
                reservation.setNumberOfAdults(updatedReservation.getNumberOfAdults());
                reservation.setNumberOfChildren(updatedReservation.getNumberOfChildren());
                reservationRepository.save(reservation);
            } else {
                throw new ResourceNotFoundException("The specified dates are not available.");
            }
        } else {
            // Handle reservation not found error
            throw new ResourceNotFoundException("Reservation not found with ID: " + reservationId);
        }
    }



    private boolean areDatesAvailable(LocalDate checkInDate, LocalDate checkOutDate, Long reservationIdToExclude) {
        List<Reservation> overlappingReservations = reservationRepository.findOverlappingReservations(checkInDate, checkOutDate, reservationIdToExclude);
        return overlappingReservations.isEmpty();
    }


}
