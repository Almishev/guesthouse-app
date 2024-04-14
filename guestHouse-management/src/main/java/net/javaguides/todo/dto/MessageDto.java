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
public class MessageDto {

    private Long id;

    private String name;

    private String phone;

    private String email;

    private String message;

    private LocalDate date;

    private boolean completed;
}
