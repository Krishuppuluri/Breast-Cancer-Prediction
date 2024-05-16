
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/screens/ContactAdmin.css';


function ContactAdmin() {
  // const dispatch = useDispatch();
  // const contactUsData = useSelector((state) => state.user.contactUsData);
  // const [showTable, setShowTable] = useState(false);

  const [records, setRecords] = useState([])
  useEffect(()=> {
    //axios.get("https://jsonplaceholder.typicode.com/users")
    axios.get("https://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/users/contact")
    .then(res => {setRecords(res.data)})
    .catch(err => console.log(err))
  }, [])
  
   function handleDelete(id) {
    const confirm =window.confirm("Have you checked this record?");
    if (confirm){
      try {
        axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/contactCheck', {id})
        .then(res => {alert("Record is checked.")});
        window.location.href = '/Admin/contact';
      }
      catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className = 'contact-admin-container'>
        <div>
          <table>
            <thead>
              <tr>
                <th style={{width: '50px'}}>No</th>
                <th style={{width: '80px'}}>Name</th>
                <th style={{width: '120px'}}>Phone</th>
                <th style={{width: '180px'}}>Email</th>
                <th>Topic</th>
                <th style={{width: '260px'}}>Message</th>
                <th style={{width: '200px'}}>Time</th>
                <th style={{width: '120px'}}>Operation</th>

              </tr>



              </thead>
              
              <tbody>
                {records.map((r,i)=> {
                  if (r.contact_topic == 0) {
                    r.contact_topic = "Choose Topic"
                  }
                  if (r.contact_topic == 1) {
                    r.contact_topic = "Doctor Related Queries"
                  }
                  if (r.contact_topic == 2) {
                    r.contact_topic = "Suggestions"
                  }
                  if (r.contact_topic == 3) {
                    r.contact_topic = "Feedback"
                  }
                  if (r.contact_topic == 4) {
                    r.contact_topic = "Technical Issue Reports"
                  }
                  
                  return <tr key={i}>
                    <td style={{width: '50px'}}> {r.id}</td>
                    <td style={{width: '80px'}}> {r.contact_name}</td>
                    <td style={{width: '120px'}}> {r.contact_phone}</td>
                    <td style={{width: '180px'}}> {r.contact_email}</td>
                    
                    <td> {r.contact_topic}</td>
                    <td style={{width: '260px'}}> {r.contact_message}</td>
                    <td style={{width: '200px'}}> {r.contact_time}</td>

                    <td style={{width: '120px'}}> <button className = 'btn' onClick={e =>handleDelete(r.id)}>Check</button></td>
               
                  </tr>
                })}
              </tbody>
            
          </table>
        </div>
        </div>

  );

};

export default ContactAdmin;
