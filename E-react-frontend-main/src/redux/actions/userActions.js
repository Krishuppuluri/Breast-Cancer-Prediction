
//src/redux/actions/userActions.js
// import axios from 'axios';

// export const fetchUsers = () => async (dispatch) => {
//   try {
//     const response = await axios.get('http://localhost:8080/api/users'); // Replace with your API endpoint
//     dispatch({ type: 'FETCH_USERS', payload: response.data });
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };


// export const fetchPatientRegistration = () => async (dispatch) => {
//   try {
//     const response = await axios.get('http://localhost:8080/api/users/patients'); // Replace with your actual backend API endpoint
//     dispatch({ type: 'FETCH_PATIENT_REGISTRATION_SUCCESS', payload: response.data });
//   } catch (error) {
//     console.error('Error fetching patient registration:', error);
//     dispatch({ type: 'FETCH_PATIENT_REGISTRATION_FAILURE' });
//   }
// };



// src/redux/actions/userActions.js
import axios from 'axios';

const BASE_URL = 'https://e-react-node-backend-22ed6864d5f3.herokuapp.com'; // Update with your node backend app URL
//const BASE_URL = 'http://localhost:8080'; // Update with your node backend app URL

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/users`);
    dispatch({ type: 'FETCH_USERS', payload: response.data });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const fetchPatientRegistration = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/users/patients`);
    dispatch({ type: 'FETCH_PATIENT_REGISTRATION_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error fetching patient registration:', error);
    dispatch({ type: 'FETCH_PATIENT_REGISTRATION_FAILURE' });
  }
};

