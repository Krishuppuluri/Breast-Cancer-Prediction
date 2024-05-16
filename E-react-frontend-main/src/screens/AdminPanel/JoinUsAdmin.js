import React, { useEffect, useState } from 'react';
import axios from 'axios'
import '../../styles/screens/ContactAdmin.css';


function JoinUsAdmin() {
  // const dispatch = useDispatch();
  // const contactUsData = useSelector((state) => state.user.contactUsData);
  // const [showTable, setShowTable] = useState(false);


  const [records, setRecords] = useState([])
  useEffect(()=> {
    //axios.get("https://jsonplaceholder.typicode.com/users")
    axios.get("https://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/users/joinus")
    .then(res => {setRecords(res.data)})
    .catch(err => console.log(err))
  }, [])
  
  function handleReveive(id) {
    const confirm =window.confirm("Have you checked this record?");
    if (confirm){
      try {
        axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/joinReceive', {id})
        .then(res => {alert("Record is checked.")});
        window.location.href = '/Admin/joinus';
      }
      catch (err) {
        console.log(err);
      }
    }
  };
  function handleVerify(id) {
    const confirm =window.confirm("Have you verified this record?");
    if (confirm){
      try {
        axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/joinVerify', {id})
        .then(res => {alert("Record is verified.")});
        window.location.href = '/Admin/joinus';
      }
      catch (err) {
        console.log(err);
      }
    }
  };
  

  return (
    <div className = 'contact-admin-container' >
          <table>
            <thead>
              <tr>
                <th style={{width: '50px'}}>No</th>
                <th style={{width: '100px'}}>Name</th>
                <th style={{width: '130px'}}>Phone</th>
                <th style={{width: '160px'}}>Email</th>
                <th style={{width: '130px'}}>Specialty</th>
                <th style={{width: '180px'}}>Working Address</th>
                <th style={{width: '130px'}}>Certificate</th>
                <th style={{width: '130px'}}>Note</th>
                <th style={{width: '180px'}}>Submit Time</th>
                <th style={{width: '130px'}}>Recieve</th>
                <th style={{width: '130px'}}>Verify</th>
              </tr>
              </thead>
              <tbody>
                {records.map((r,i)=> {
                  
                  return <tr key={i}>
                    <td style={{width: '50px'}}> {r.id}</td>
                    <td style={{width: '100px'}}> {r.fName} {r.lName}</td>
                    <td style={{width: '130px'}}> {r.phone}</td>
                    <td style={{width: '16px'}}> {r.email}</td>
                    
                    <td style={{width: '130px'}}> {r.specialty}</td>
                    <td style={{width: '180px'}}> {r.working_address}</td>
                    <td style={{width: '130px'}}> {r.certificate_num}</td>
                    <td style={{width: '130px'}}> {r.note}</td>
                    <td style={{width: '180px'}}> {r.submit_time}</td>
                {!r.receive ? <td style={{width: '130px'}}><button className = 'btn' onClick={e =>handleReveive(r.id)}>Reveive</button></td> : <td>Received</td>}
                    
                {!r.verify ? <td style={{width: '130px'}}> <button className = 'btn' onClick={e =>handleVerify(r.id)}>Verify</button></td> : <td>Verified</td>}

                  </tr>
                })}
              </tbody>
            
          </table>
        </div>

  );

};

export default JoinUsAdmin;
