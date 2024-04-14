package net.javaguides.todo.repository;

import net.javaguides.todo.entity.Content;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentRepository extends JpaRepository<Content, Long> {


}
