import React, { useEffect, useState } from 'react';
import axios from 'axios'
import '../../styles/screens/ContactAdmin.css';

function HelpAdmin() {
  // const dispatch = useDispatch();
  // const contactUsData = useSelector((state) => state.user.contactUsData);
  // const [showTable, setShowTable] = useState(false);

  const [records, setRecords] = useState([])
  useEffect(()=> {
    //axios.get("https://jsonplaceholder.typicode.com/users")
    axios.get("https://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/users/clinichelp")
    .then(res => {setRecords(res.data)})
    .catch(err => console.log(err))
  }, [])
  

  function handleDelete(id) {
    const confirm =window.confirm("Have you checked this record?");
    if (confirm){
      try {
        axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/clinichelpCheck', {id})
        .then(res => {alert("Record is checked.")});
        window.location.href = '/Admin/clinichelp';
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
                <th>Name</th>
                <th>Phone</th>
                <th style={{width: '180px'}}>Email</th>
                <th style={{width: '300px'}}>Message</th>
                <th style={{width: '180px'}}>Time</th>
                <th style={{width: '120px'}}>Reply</th>

                {/* <th>contact_topic</th>
                <th>contact_message</th>
                <th>contact_time</th>
                <th>contact_reply</th> */}
              </tr>
              </thead>
              <tbody>
                {records.map((r,i)=> {                  
                  return <tr key={i}>
                    <td style={{width: '50px'}}> {r.id}</td>
                    <td> {r.help_name}</td>
                    <td> {r.help_phone}</td>
                    <td style={{width: '180px'}}> {r.help_email}</td>
                    <td style={{width: '300px'}}> {r.help_message}</td>
                    <td style={{width: '180px'}}> {r.help_time}</td>
                    <td style={{width: '120px'}}> <button className = 'btn' onClick={e =>handleDelete(r.id)}>Check</button></td>


                    
                  </tr>
                })}
              </tbody>
            
          </table>
        </div>
        </div>

  );

};

export default HelpAdmin;
