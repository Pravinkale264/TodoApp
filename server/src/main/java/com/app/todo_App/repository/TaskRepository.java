package com.app.todo_App.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.todo_App.models.Task;

public interface TaskRepository extends JpaRepository<Task,Long>{

}
