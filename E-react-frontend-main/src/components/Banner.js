import React from 'react';
import { Box, Typography, Container, TextField } from '@mui/material';
import { IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Banner({ onSearchChange }) {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',  // Full width
        backgroundColor: '#4318ff',
        backgroundImage: 'linear-gradient(45deg, #4318ff, #821cff)',  // Gradient effect
        color: 'white',
        paddingTop: "40px",
        paddingBottom: "40px",
        justifyContent: 'center',
        alignItems: "center",
        textAlign:'center',
        borderRadius:"20px",
      }}
    >
      <Container>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" align="center" gutterBottom>
            Welcome to our Healthcare Prediction Models Hub.
          </Typography>
          <Typography variant="h6" align="center" gutterBottom>
            Here, you can explore a range of state-of-the-art prediction models...
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Search prediction models..."
            onChange={onSearchChange}
            fullWidth
            sx={{ mt: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              type: "search",
              style: {
                backgroundColor: 'white',
                borderRadius: '5px',
                maxWidth:"500px",
                justifyContent:'center',
                alignSelf:'center',
                boxshadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                maxHeight:"45px"
              }
            }}
          />

        </Box>
      </Container>
    </Box>
  );
}

export default Banner;
