import React, { useEffect, useState } from 'react';
import axios from 'axios'
import '../../styles/screens/ContactAdmin.css';


function DocTaskStaff() {
  // const dispatch = useDispatch();
  // const contactUsData = useSelector((state) => state.user.contactUsData);
  // const [showTable, setShowTable] = useState(false);

  const [records, setRecords] = useState([])
  useEffect(()=> {
    //axios.get("https://jsonplaceholder.typicode.com/users")
    axios.get("https://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/users/patientMessageStaff")
    .then(res => {setRecords(res.data)})
    .catch(err => console.log(err))
  }, [])
  

  function handleReply(id) {
    const confirm =window.confirm("Have you checked this record?");
    if (confirm){
      try {
        axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/stafftopatientReply', {id})
        .then(res => {alert("Record is checked.")});
        window.location.href = '/ClinicalStaff/patientmessage';
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
                <th>Doctor ID</th>
                <th>Patient ID</th>
                <th style={{width: '360px'}}>Message</th>
                <th style={{width: '240px'}}>Time</th>
                <th>Operation</th>

              </tr>
              </thead>
              <tbody>
                {records.map((r,i)=> {
                  
                  return <tr key={i}>
                    <td style={{width: '50px'}}> {r.id}</td>
                    <td> {r.doctor_id}</td>
                    <td> {r.patient_id}</td>
                    <td style={{width: '360px'}}> {r.message}</td>
                    
                    <td style={{width: '240px'}}> {r.sent_time}</td>
                    {!r.check_status && <td> <button className = 'btn' onClick={e =>handleReply(r.id)}>Reply</button></td>}


              
                  </tr>
                })}
              </tbody>
            
          </table>
        </div>
        </div>

  );

};

export default DocTaskStaff;
