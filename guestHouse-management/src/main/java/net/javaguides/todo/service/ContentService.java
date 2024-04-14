package net.javaguides.todo.service;

import net.javaguides.todo.dto.ContentDto;
import net.javaguides.todo.entity.Content;


import java.util.List;

public interface ContentService {

    public List<ContentDto> getAllContents();

    public ContentDto createContent(ContentDto ContentDto);

    ContentDto getContent(Long id);

    ContentDto updateContent(Long id, ContentDto contentDto);

    public void deleteContent(Long id);
}
