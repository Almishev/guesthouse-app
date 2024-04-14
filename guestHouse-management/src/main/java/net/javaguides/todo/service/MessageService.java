package net.javaguides.todo.service;

import net.javaguides.todo.dto.ContentDto;
import net.javaguides.todo.dto.MessageDto;

import java.util.List;

public interface MessageService {

    public List<MessageDto> getAllMessages();

    public void deleteMessage(Long id);

    MessageDto completeMessage(Long id);

    MessageDto inCompleteMessage(Long id);

    MessageDto addMessage(MessageDto messageDto);

    MessageDto getMessage(Long id);




}
