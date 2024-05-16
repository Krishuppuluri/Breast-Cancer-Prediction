import React, { useEffect, useState } from 'react';
import axios from 'axios'
import '../../styles/screens/ContactAdmin.css';

function ReviewAdmin() {

  const [records, setRecords] = useState([])
  useEffect(()=> {
    axios.get("https://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/users/reviews")
    .then(res => {setRecords(res.data)})
    .catch(err => console.log(err))
  }, [])
  

  return (
    <div className = 'contact-admin-container'>
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Review</th>
                <th>Rating</th>

              </tr>
              </thead>
              <tbody>
                {records.map((r,i)=> {                  
                  return <tr key={i}>
                    <td> {r.Id}</td>
                    <td> {r.UserID}</td>
                    <td> {r.Review}</td>
                    <td> {r.Rating}</td>                    
                  </tr>
                })}
              </tbody>
            
          </table>
        </div>
        </div>

  );

};

export default ReviewAdmin;
