import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Rating from '@mui/material/Rating';
import Alert from '@mui/material/Alert';

import FormLabel from '@mui/material/FormLabel';
import backgroundImage from '../styles/screens/reviews.svg';
import { Box, TextareaAutosize, Typography } from '@mui/material';
import { Button } from 'antd';

function TestimonialForm() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value, 10));
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating > 0 && review.trim() !== '') {
      // Attempt to read login data from localStorage
      var loginDetails = JSON.parse(localStorage.getItem("loginData"));

      // If login data is not found in localStorage, try sessionStorage
      if (!loginDetails) {
        loginDetails = JSON.parse(sessionStorage.getItem("loginData"));
      }

      // Check if loginDetails is still null or undefined
      if (!loginDetails) {
        console.log("Invalid loginDetails or missing id. Cannot submit the form.");
        // Handle the case where login data is not available (e.g., redirect to login page)
      } else {
        // Create a testimonial object
        const testimonial = {
          userId: loginDetails.id,
          rating,
          review,
        };

        // Pass the testimonial to the parent component for submission
        debugger;
        let response = await fetch(`http://localhost:8080/addReview`, {
          method: "POST",
          body: JSON.stringify(testimonial),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        });

        // Reset the form
        if (response.ok) {
          let formattedResponse = await response.json();
          console.log(formattedResponse);
          console.log("Success");

          setRating(0);
          setReview('');
          return;
        } else {
          console.log("Unable to submit Review");
        }
      }
    }
  };

  const formStyles = {
    minHeight: '600px',
    with: "100%",
    height: "100%",
    paddingBottom: '500px',
  };

  const textareaStyles = {
    width: '50%',
    minHeight: '200px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1rem',
  };

  return (
    <div style={formStyles}>
      <Box sx={{ display: "flex", alignItems: "center,", justifyContent: "space-around", width: "50%", marginX: "auto", marginTop: "3%", marginBottom: "1.5%", p: "0.25%", boxShadow: "1px 1px 20px lightgray" }}>
        <Typography variant='h3' sx={{ textAlign: "center", fontWeight: "semi-bold", p: "1%" }}>Leave a Review</Typography>
        <Box>
          <img src={backgroundImage} height={"100px"} alt="Background" />
        </Box>
      </Box>

      <Box sx={{ width: "80%", margin: "auto" }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ boxShadow: "1px 1px 20px lightgray", px: "5%", py: "3%", width: "80%", margin: "auto" }}>
            <Box sx={{ display: "flex", my: "3%" }}>
              <Typography sx={{ paddingRight: "0.5%", fontSize: "25px" }}>Please, Rate Us: </Typography>
              <Rating
                sx={{ fontSize: "35px" }}
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue)
                }}
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ paddingRight: "1%", fontSize: "20px" }}>Please, Write a Review :</Typography>
              <TextareaAutosize onChange={handleReviewChange}
                placeholder="Please Write a Review ..."
                rowsMin={5}
                fullWidth
                value={review}
                style={{ width: '75%', maxWidth: '75%', height: "6rem", padding: "1%" }}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: "3%" }}>
              <Button size='large' color='#2c2c2c' htmlType='submit'>  Submit</Button>
            </Box>
          </Box>
        </form>
      </Box>
    </div>
  );
}

export default TestimonialForm;
