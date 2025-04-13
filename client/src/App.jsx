import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <Container maxWidth="md" sx={{ marginTop:"5rem" }}>
      <Typography variant="h3" align="center" mb={3}>
        Todo App
      </Typography>
      <TodoForm/>
      <TodoList />
    </Container>
  );
};

export default App;
