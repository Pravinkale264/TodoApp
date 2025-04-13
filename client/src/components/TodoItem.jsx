import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Box, Typography, IconButton, Button, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';

const TodoItem = ({ task, onToggle, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);

    const handleEditClick = () => {
        setIsEditing(true);

    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setNewTitle(task.title); // Reset to original title
        toast.error("Changes cancelled!", {
            position: "top-right",
            duration: 3000, ariaProps: {
                role: 'status',
                'aria-live': 'polite',
            }, removeDelay: 1000
        })
    };

    const handleSaveEdit = () => {
        if (newTitle.length > 40) {
            toast.error("Title is to Long!", {
                position: "top-right",
                duration: 3000, ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                }, removeDelay: 1000
            });
        }
        else {

            onEdit(task.id, newTitle); // Trigger the edit action passed from parent
            setIsEditing(false);
            toast.success("Task Updated!", {
                position: "top-right",
                duration: 3000, ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                }, removeDelay: 1000
            })
        }

    };

    return (
        <Box display="flex" alignItems="center" mb={1}>
            {/* Toggle button */}
            <Button
                variant="outlined"
                color={task.completed ? 'success' : 'primary'}
                onClick={() => onToggle(task.id)}
                sx={{ marginRight: 2 }}
            >
                {task.completed ? 'Completed' : 'Mark as Done'}
            </Button>

            {/* Task title or TextField when editing */}
            {isEditing ? (
                <TextField
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)} // Update the newTitle state as user types
                    size="small"
                    sx={{ flexGrow: 1, marginRight: 1 }}
                />
            ) : (
                <Typography
                    variant="body1"
                    sx={{ flexGrow: 1, textDecoration: task.completed ? 'line-through' : 'none' }}
                >
                    {task.title}
                </Typography>
            )}

            {/* Edit Button */}
            {isEditing ? (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={handleSaveEdit}
                        sx={{ marginRight: 1 }}
                    >
                        Save
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={handleCancelEdit}
                    >
                        Cancel
                    </Button>
                </>
            ) : (
                <IconButton onClick={handleEditClick} color="secondary">
                    <EditNoteIcon />
                </IconButton>
            )}

            {/* Delete button */}
            <IconButton
                onClick={() => onDelete(task.id)}
                sx={{ color: "#D2042D" }}
            // color="secondary"
            >
                <DeleteIcon />
            </IconButton>
            <Toaster />
        </Box>
    );
};

export default TodoItem;
