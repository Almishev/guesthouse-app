package net.javaguides.todo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDto {

    private Long id;

    private String username;


    private LocalDate checkInDate;


    private LocalDate checkOutDate;

    private String email;

    private String phone;

    private int numberOfAdults;

    private int numberOfChildren;
}
