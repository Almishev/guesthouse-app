package net.javaguides.todo.controller;


import lombok.AllArgsConstructor;
import net.javaguides.todo.dto.ContentDto;
import net.javaguides.todo.service.ContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/contents")
@AllArgsConstructor
public class ContentController {

    @Autowired
    private ContentService contentService;

    @PostMapping
    public ResponseEntity<ContentDto> addContent(@RequestBody ContentDto contentDto){

        ContentDto savedContent = contentService.createContent(contentDto);

        return new ResponseEntity<>(savedContent, HttpStatus.CREATED);

    }

    @GetMapping("{id}")
    public ResponseEntity<ContentDto> getContent(@PathVariable("id") Long id){
        ContentDto contentDto = contentService.getContent(id);
        return new ResponseEntity<>(contentDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ContentDto>> getAllContents(){
        List<ContentDto> contents = contentService.getAllContents();
        return ResponseEntity.ok(contents);
    }

    @PutMapping("{id}")
    public ResponseEntity<ContentDto> updateContent(@RequestBody ContentDto contentDto, @PathVariable("id") Long id){
        ContentDto updatedTodo = contentService.updateContent(id, contentDto);
        return ResponseEntity.ok(updatedTodo);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteContent(@PathVariable("id") Long id){
        contentService.deleteContent(id);
        return ResponseEntity.ok("Content deleted successfully!.");
    }
}
