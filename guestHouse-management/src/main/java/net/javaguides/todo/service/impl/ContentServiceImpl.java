package net.javaguides.todo.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.todo.dto.ContentDto;
import net.javaguides.todo.dto.ReservationDto;
import net.javaguides.todo.entity.Content;
import net.javaguides.todo.entity.Reservation;
import net.javaguides.todo.repository.ContentRepository;
import net.javaguides.todo.service.ContentService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ContentServiceImpl implements ContentService {

    private final ContentRepository contentRepository;
    private ModelMapper modelMapper;
    @Override
    public List<ContentDto> getAllContents() {
        List<Content> contents = contentRepository.findAll();

        return contents.stream().map((content) -> modelMapper.map(content, ContentDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public ContentDto createContent(ContentDto contentDto) {

        Content content = modelMapper.map(contentDto, Content.class);


        Content savedContent = contentRepository.save(content);



        ContentDto savedContentDto = modelMapper.map(savedContent, ContentDto.class);

        return savedContentDto;
    }

    @Override
    public ContentDto getContent(Long id) {
        Content content =contentRepository.findById(id)
                .orElseThrow(() -> new net.javaguides.todo.exception.ResourceNotFoundException("Reservation not found with id:" + id));

        return modelMapper.map(content, ContentDto.class);
    }

    @Override
    public ContentDto updateContent(Long id, ContentDto contentDto) {

        Content content = contentRepository.findById(id)
                .orElseThrow(() -> new net.javaguides.todo.exception.ResourceNotFoundException("Content not found with id : " + id));
        content.setTitle(contentDto.getTitle());
        content.setText(contentDto.getText());

        Content updatedContent = contentRepository.save(content);

        return modelMapper.map(updatedContent, ContentDto.class);
    }

    @Override
    public void deleteContent(Long id) {
        Optional<Content> contentOptional = contentRepository.findById(id);
        if (contentOptional.isPresent()) {
            contentRepository.deleteById(id);
        } else {
            throw new net.javaguides.todo.exception.ResourceNotFoundException("There are no reservation with this id: " + id);
        }
    }
}
