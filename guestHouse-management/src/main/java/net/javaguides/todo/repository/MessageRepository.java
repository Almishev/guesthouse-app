package net.javaguides.todo.repository;

import net.javaguides.todo.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository   extends JpaRepository<Message, Long> {

}
