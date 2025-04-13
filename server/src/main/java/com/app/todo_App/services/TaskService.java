package com.app.todo_App.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.app.todo_App.models.Task;
import com.app.todo_App.repository.TaskRepository;

@Service
public class TaskService {
	
	private final TaskRepository taskRepository;
	
	public TaskService(TaskRepository taskRepository) {
		this.taskRepository = taskRepository;
	}

	public List<Task> getAllTasks() {
		return taskRepository.findAll();
	}

	public void createTask(String title) {
		// TODO Auto-generated method stub
		Task task = new Task();
		task.setTitle(title);
		task.setCompleted(false);
		taskRepository.save(task);
	}

	public void deleteTask(Long id) {
		// TODO Auto-generated method stub
		taskRepository.deleteById(id);
	}

	public void toggleTask(Long id) {
		Task task = taskRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("Invalid task id"));
		task.setCompleted(!task.isCompleted());
		taskRepository.save(task);
	}

	public void updateTask(Long id, Task editTask) {
		// TODO Auto-generated method stub
		Task task = taskRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("Invalid task id"));
		task.setTitle(editTask.getTitle());
		taskRepository.save(task);
	}

}
