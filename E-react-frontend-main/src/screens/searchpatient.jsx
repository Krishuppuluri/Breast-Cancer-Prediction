import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/screens/Search.css';
import { useDispatch } from "react-redux";
import addPatientInfoAction from "../redux/actions/addPatientInfoAction";


const Searchpatient = () => {
    let variable = {};
  const [phone, setPhone] = useState({
    phoneNumber: "",
  });
  const [error, setError] = useState(false)
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setPhone((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      //local backend api link (http://localhost:8080/searchpatient) when you are running backend repo on your localhost
    await axios.post("https://e-react-node-backend-22ed6864d5f3.herokuapp.com/searchpatient", phone).then(function (response) {
      variable = response.data 
      dispatch(addPatientInfoAction(variable));
    })     
      navigate("/searchresult",{state:variable});
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    
    <>
    <center>
   <div className="form">
    <br></br><br></br><br></br><br></br>
      <h1>Search For Patient</h1>
      <input class="inputstyle"
        type="text"
        placeholder="Enter Mobile Number"
        name="phoneNumber"
        onChange={handleChange}
      />

      <button class="button buttonS" onClick={handleClick}>Search</button>
      {error && "Something went wrong!"}
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>

          </div></center>
    
    </>
  );
};

export default Searchpatient;