import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import { Box } from '@mui/material';
import toast from 'react-hot-toast';

const TodoList = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        const FetchData = async () => {
            const response = await fetch('http://localhost:8080/getAll');
            if (!response.ok) {
                return new Error('Data not fetched');
            }
            const result = await response.json();
            // console.log(result);
            setData(result);
        };
        
        FetchData();
    }, [data]);

    const handleToggle = (taskId) => {
        // Call the backend to toggle the task completion status
        fetch(`http://localhost:8080/${taskId}/toggle`)
          .then((response) => {
            if (response.ok) {
                setData((prevTasks) =>
                prevTasks.map((task) =>
                  task.id === taskId ? { ...task, completed: !task.completed } : task
                )
              );
            }
          })
          .catch((error) => console.error('Error toggling task:', error));

          const task = data.find((task)=> task.id === taskId);
          const message = task.completed ? "Task Pending...!":"Task Completed!";
          const status = task.completed ? "info":"success";

          if (status === "success") {
            toast.success(message, {
              position: "top-right",
              autoClose: 3000, // Toast will auto close after 3 seconds
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else if (status === "info") {
            toast(message, {
              position: "top-right",
              autoClose: 3000, // Toast will auto close after 3 seconds
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              icon:'⌛'
            });
          }
      };
    
      const handleDelete = (taskId) => {
        // Call the backend to delete the task
        fetch(`http://localhost:8080/${taskId}/delete`)
          .then((response) => {
            if (response.ok) {
                setData((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
            }
          })
          .catch((error) => console.error('Error deleting task:', error));
          toast.error("Task Deleted!",{
            position: "top-right",
            duration: 3000, ariaProps: {
                role: 'status',
                'aria-live': 'polite',
            }, removeDelay: 1000
        })
      };

      const handleEdit = (taskId, newTitle) => {
        // Call the backend to update the task title
        fetch(`http://localhost:8080/${taskId}/update`, {
          method: 'PUT', // Use PUT for updating
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: newTitle }),
        })
          .then((response) => {
            if (response.ok) {
              setData((prevTasks) =>
                prevTasks.map((task) =>
                  task.id === taskId ? { ...task, title: newTitle } : task
                )
              );
            }
          })
          .catch((error) => console.error('Error updating task:', error));
      };

    return (
        <Box>
            {data?.map((task,index) => (
                <TodoItem 
                key={index} 
                task={task}    
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={handleEdit}
                />
            ))}
        </Box>
    );
};

export default TodoList;
