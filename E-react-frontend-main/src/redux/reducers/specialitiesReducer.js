// src/reducers/specialities.js
const initialState = {
  specialities: [],
};

const specialitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_SPECIALITIES':
      return { ...state, specialities: action.payload };
    case 'FETCH_SPECIALITIES_FAILURE':
      return { ...state, specialities: [] }; // Handle failure by clearing the data
    default:
      return state;
  }
};

export default specialitiesReducer;
