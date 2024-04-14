package net.javaguides.todo.controller;

import lombok.AllArgsConstructor;
import net.javaguides.todo.dto.ReservationDto;
import net.javaguides.todo.entity.Reservation;
import net.javaguides.todo.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/reservations")
@AllArgsConstructor
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @GetMapping
    public List<ReservationDto> getAllReservations() {
        return reservationService.getAllReservations();
    }


    @PostMapping
    public ResponseEntity<ReservationDto> createReservation(@RequestBody ReservationDto reservationDto) {
        ReservationDto savedReservation = reservationService.createReservation(reservationDto);

        return new ResponseEntity<>(savedReservation, HttpStatus.CREATED);
    }


    @GetMapping("/available-days")
    public ResponseEntity<List<LocalDate>> getAvailableDays(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        List<LocalDate> availableDays = reservationService.getAvailableDays(startDate, endDate);
        return new ResponseEntity<>(availableDays, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<ReservationDto> getReservation(@PathVariable("id") Long id){
        ReservationDto reservationDto = reservationService.getReservation(id);
        return new ResponseEntity<>(reservationDto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable("id") Long id) {
        reservationService.deleteReservation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateReservation(@PathVariable("id") Long reservationId, @RequestBody Reservation reservation) {
        reservationService.updateReservation(reservationId, reservation);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
