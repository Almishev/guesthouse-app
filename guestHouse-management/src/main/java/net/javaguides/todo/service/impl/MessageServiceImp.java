package net.javaguides.todo.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.todo.dto.MessageDto;
import net.javaguides.todo.entity.Message;
import net.javaguides.todo.repository.MessageRepository;
import net.javaguides.todo.service.MessageService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class MessageServiceImp implements MessageService {

    private MessageRepository messageRepository;

    private ModelMapper modelMapper;
    @Override
    public List<MessageDto> getAllMessages() {
        List<Message> messages = messageRepository.findAll();

        return messages.stream().map((todo) -> modelMapper.map(todo, MessageDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteMessage(Long id) {

        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new net.javaguides.todo.exception.ResourceNotFoundException("Message not found with id : " + id));

        messageRepository.deleteById(id);
    }

    @Override
    public MessageDto completeMessage(Long id) {
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new net.javaguides.todo.exception.ResourceNotFoundException("Message not found with id : " + id));

        message.setCompleted(Boolean.TRUE);

        Message updatedMessage = messageRepository.save(message);

        return modelMapper.map(updatedMessage, MessageDto.class);
    }

    @Override
    public MessageDto inCompleteMessage(Long id) {
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new net.javaguides.todo.exception.ResourceNotFoundException("Message not found with id : " + id));

        message.setCompleted(Boolean.FALSE);

        Message updatedMessage = messageRepository.save(message);

        return modelMapper.map(updatedMessage, MessageDto.class);
    }

    @Override
    public MessageDto addMessage(MessageDto messageDto) {
        Message message = modelMapper.map(messageDto, Message.class);

        Message savedMessage = messageRepository.save(message);


        MessageDto savedMessageDto = modelMapper.map(savedMessage, MessageDto.class);

        return savedMessageDto;

    }

    @Override
    public MessageDto getMessage(Long id) {
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new net.javaguides.todo.exception.ResourceNotFoundException("Message not found with id:" + id));

        return modelMapper.map(message, MessageDto.class);
    }
}
