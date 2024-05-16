//src/redux/actions/specialitiesActions.js
import axios from 'axios';

const BASE_URL = 'https://e-react-node-backend-22ed6864d5f3.herokuapp.com';
//const BASE_URL = 'http://127.0.0.1:8080';
export const fetchSpecialities = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/users/specialities`);
    dispatch({ type: 'FETCH_SPECIALITIES', payload: response.data });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};