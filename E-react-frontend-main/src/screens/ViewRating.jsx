import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, TextareaAutosize, Typography } from '@mui/material';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  const apiUrl = 'http://localhost:8080/GetAllReviews';
const ViewRating = () => {
    const [userReviews, setUserReviews] = useState([]);
    useEffect(() => {
      
        fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
            setUserReviews(data);
        })
        .catch((error) => {
        });
    
    }, [])
    

  return (
    <div> 
        <Box sx={{width:"80%", m:"auto", py:"2% "}} component={Paper}>
            <Box>
                <Typography sx={{fontSize:"25px", textAlign:"center", pt:"1%"}}> User Reviews Are Listed Below</Typography>
            </Box>
        <TableContainer  sx={{paddingX:"1%"}}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Review ID</TableCell>
          <TableCell align="right">User Id</TableCell>
          <TableCell align="right"> Review</TableCell>
          <TableCell align="right">Rating</TableCell>
         
        </TableRow>
      </TableHead>
      <TableBody>
        { userReviews.map((row) => (
          <TableRow
            key={row.Id}
            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell >
              {row.Id}
            </TableCell>
            <TableCell align="right">{row.UserID}</TableCell>
            <TableCell align="right">{row.Review}</TableCell>
            <TableCell align="right">{row.Rating}</TableCell>
           
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </Box>
  
  </div>
  )
}

export default ViewRating