package com.app.todo_App.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.todo_App.models.Task;
import com.app.todo_App.services.TaskService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")  // Allow only your frontend
@RequestMapping()
public class TaskController {
    @Autowired
    private final TaskService taskService;
    
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }
    
    @GetMapping("/getAll")
    public List<Task> getTasks(){
        return taskService.getAllTasks();
    } 
    
    @PostMapping("/addTask")
    public String createTask(@RequestBody Task task) {
        taskService.createTask(task.getTitle());
        return "New Task Added!";
    }
    
    @GetMapping("/{id}/delete")
    public String deleteTask(@PathVariable Long id){
        taskService.deleteTask(id);
        return "Task Deleted!";
    } 
    
    @GetMapping("/{id}/toggle")
    public String toggleTask(@PathVariable Long id){
    	taskService.toggleTask(id);
    	return "Task Toggled!";
    }
    
    @PutMapping("/{id}/update")
    public String editTask(@PathVariable Long id,@RequestBody Task editTask) {
    	taskService.updateTask(id,editTask);
    	return "Task Updated!";
    }
}
















