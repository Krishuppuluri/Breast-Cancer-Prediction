// src/redux/store.js

import { createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from "redux-thunk";
import userReducer from "./reducers/userReducer";
import addPatientInfoReducer from "./reducers/addPatientInfoReducer";
import specialitiesReducer from './reducers/specialitiesReducer';

const rootReducer = combineReducers({
  user: userReducer,
  specialities: specialitiesReducer,
  patientInfo: addPatientInfoReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
