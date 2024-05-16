import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, Typography, Card, CardContent, Grid, List, ListItem, ListItemText } from '@mui/material';import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

export function PatientRecordView({ recordData }) {
    return (
        <List>
            {recordData.map((record, index) => (
                <ListItem key={index}>
                    {Object.entries(record).map(([key, value]) => (
                        <ListItemText 
                            primary={`${key}: ${value}`} 
                            key={`${index}-${key}`}
                        />
                    ))}
                </ListItem>
            ))}
        </List>
    );
}
