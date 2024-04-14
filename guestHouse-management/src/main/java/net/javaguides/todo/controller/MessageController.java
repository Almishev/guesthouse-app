package net.javaguides.todo.controller;

import lombok.AllArgsConstructor;
import net.javaguides.todo.dto.MessageDto;
import net.javaguides.todo.service.ContentService;
import net.javaguides.todo.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/messages")
@AllArgsConstructor
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping
    public ResponseEntity<MessageDto> addMessage(@RequestBody MessageDto messageDto){

        messageDto.setDate(LocalDate.now());
        MessageDto savedTodo = messageService.addMessage(messageDto);

        return new ResponseEntity<>(savedTodo, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<MessageDto> getMessage(@PathVariable("id") Long id){
        MessageDto todoDto = messageService.getMessage(id);
        return new ResponseEntity<>(todoDto, HttpStatus.OK);
    }


    @GetMapping
    public ResponseEntity<List<MessageDto>> getAllMessages(){
        List<MessageDto> todos = messageService.getAllMessages();

        return ResponseEntity.ok(todos);
    }


    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteMessage(@PathVariable("id") Long id){
        messageService.deleteMessage(id);
        return ResponseEntity.ok("Message deleted successfully!.");
    }

    @PatchMapping("{id}/complete")
    public ResponseEntity<MessageDto> completeMessage(@PathVariable("id") Long todoId){
        MessageDto updatedMessage = messageService.completeMessage(todoId);
        return ResponseEntity.ok(updatedMessage);
    }

    @PatchMapping("{id}/in-complete")
    public ResponseEntity<MessageDto> inCompleteMessage(@PathVariable("id") Long id){
        MessageDto updatedTodo = messageService.inCompleteMessage(id);
        return ResponseEntity.ok(updatedTodo);
    }

}
