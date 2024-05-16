import axios from 'axios';

import { BASE_URL } from '../constants';

export const doctorGetCalendar = async (loginData, start, end) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/appointments/doctorGetCalendar`, {
      loginData,
      start: start.toISOString(),
      end: end.toISOString(),
    });
    console.log("doctorGetCalendar", response.data);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const patientGetCalendar = async (loginData, start, end) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/appointments/patientGetCalendar`, {
      loginData,
      start: start.toISOString(),
      end: end.toISOString(),
    });
    return response.data.result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const getTimeSegmentDetail = async (loginData, id) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/appointments/getTimeSegmentDetail`, {
      loginData,
      id,
    });
    return response.data.result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const doctorCreateAvailableTimeSegment = async (loginData, start, end, description) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/appointments/doctorCreateAvailableTimeSegment`, {
      loginData,
      start: start.toISOString(),
      end: end.toISOString(),
      description,
    });
    return response.data.result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const doctorApproveRequest = async (loginData, id) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/appointments/doctorApproveRequest`, {
      loginData,
      id,
    });
    if(response.data.status !== 'OK'){
      throw new Error(response.data.status);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const patientSearchForTimeSegments = async (loginData, start, end) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/appointments/patientSearchForTimeSegments`, {
      loginData,
      start: start.toISOString(),
      end: end.toISOString(),
    });
    return response.data.result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const patientBookTime = async (loginData, id, description) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/appointments/patientBookTime`, {
      loginData,
      id,
      description,
    });
    if(response.data.status !== 'OK'){
      throw new Error(response.data.status);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
