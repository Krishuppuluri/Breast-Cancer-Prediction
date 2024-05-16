import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Paper, List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
const DoctorTasksList = ({ doctorId }) => {
  const [tasks, setTasks] = useState([]);
  const [newReminder, setNewReminder] = useState('');

  const fetchReminders = useCallback(async () => {
    try {
      const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/getDoctorReminders', { doctorId });
      setTasks(response.data.map((reminder) => ({
        id: reminder.id,
        text: reminder.reminder_description
      })));
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  }, [doctorId]);
  
  useEffect(() => {
    fetchReminders();
  }, [fetchReminders]);

  const handleNewReminderChange = (e) => {
    setNewReminder(e.target.value);
  };

  const addReminder = async () => {
    try {
      await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/saveDoctorReminder', {
        doctorId,
        reminderDescription: newReminder
      });
      setTasks([...tasks, { id: tasks.length, text: newReminder, completed: false }]);
      setNewReminder('');
    } catch (error) {
      console.error('Error adding new reminder:', error);
    }
  };

  const deleteReminder = async (reminderId) => {
    try {
      await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/deleteReminder', { reminderId, doctorId });
      fetchReminders();
    } catch (error) {
      console.log("Error deleting", error);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} dense>
  
            <ListItemText primary={task.text} />
      
            <IconButton
              aria-label="delete reminder"
              color="secondary"
              onClick={() => deleteReminder(task.id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <TextField
        label="New Reminder"
        value={newReminder}
        onChange={handleNewReminderChange}
        fullWidth
        margin="normal"
        sx={{mb:2, mt:2}}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={addReminder}
        fullWidth
      >
        Add Reminder
      </Button>
    </Paper>
  );
};

export default DoctorTasksList;
