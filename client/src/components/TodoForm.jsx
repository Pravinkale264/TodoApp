import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';

const TodoForm = () => {
    const [title, setTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(title.length > 40){
            toast.error("Title is to Long!", {
                position: "top-right",
                duration: 3000, ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                }, removeDelay: 1000
            });
        }else{

        // Create the task object with the title
        const task = { title: title, completed: false };

        // Send the task object to the backend
        fetch("http://localhost:8080/addTask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        })
            .then(() => {
                console.log("New Task Added!");
                // Optionally call addTask to update the UI locally if needed
                // addTask(task); 
            })
            .catch((error) => {
                console.error("Error adding task:", error);
            });

        // Reset the input field after adding a task
        if (title.length != 0) {
            toast.success('Task Successfully Added!', {
                position: "top-right",
                duration: 3000, ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                }, removeDelay: 1000
            });
        } else {
            toast.error("Title can't be empty!", {
                position: "top-right",
                duration: 3000, ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                }, removeDelay: 1000
            });
        }
        setTitle("");
    }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} display="flex" justifyContent="space-between" mb={2}>
            <TextField
                label="New Task Title"
                variant="outlined"
                fullWidth
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "8rem", marginLeft: 2 }}
            >
                Add Task
            </Button>
            <Toaster />
        </Box>
    );
};

export default TodoForm;
