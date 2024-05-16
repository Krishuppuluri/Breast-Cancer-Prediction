import * as React from 'react';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {DoctorViewPatient} from './DoctorViewPatient';
 
export default function DocRecentPatients({doctorId}){
  const [dataForTable, setDataForTable]= useState([]);  
  const [open, setOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  function viewPatientHandler(patientID) {
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('patientId', patientID);
    window.history.pushState({}, '', newUrl);
    setOpen(true);
    setSelectedPatientId(patientID);
  }
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const patientIdFromUrl = urlParams.get('patientId');

    if (patientIdFromUrl) {
        setOpen(true);
        setSelectedPatientId(patientIdFromUrl);
    }
    const handlePopState = () => {
    
        const urlParams = new URLSearchParams(window.location.search);
        const patientIdFromUrl = urlParams.get('patientId');

        if (patientIdFromUrl) {
            setOpen(true);
            setSelectedPatientId(patientIdFromUrl);
        } else {
            setOpen(false);
            setSelectedPatientId(null);
        }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
        window.removeEventListener('popstate', handlePopState);
    };
}, []);

function closeModal() {
  const newUrl = new URL(window.location);
  newUrl.searchParams.delete('patientId');
  window.history.pushState({}, '', newUrl);

  setOpen(false);
  setSelectedPatientId(null);
}

  useEffect(() => {
    const getData= async () => {
      try {
        //https://e-react-node-backend-22ed6864d5f3.herokuapp.com
        const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/TopFiveRecentPatients', {
          doctorId
        });
  
        const { data } = response;
        if (data.error) {
          alert(JSON.stringify(data.error));
          console.log("error ")
        } else {
          console.log("data", data)
          console.log("data", data[0].service_date)
          setDataForTable(data)
        }
      } catch (error) {
        console.log(`Error With request getting top 5 recent : ${error.message}`);
      }
    };
    getData();
  },[doctorId]);



  const columns= [

    {field: 'id', headerName: 'ID',  width: 90, flex: 0.5},
    {field: 'PatientFName',headerName: 'First Name',flex: 1 },
    {field: 'PatientLName',headerName: 'Last Name',flex: 1 },
    {
      field: 'service_date',
      headerName: 'Visit Date',
      flex: 1 , 
      valueFormatter: params=>new Date(params?.value).toDateString()
    },
   {
      field: "action",
      headerName: "Action",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          viewPatientHandler(params.row.id); // Pass the patientID to the function
        };

        return (
          <div>
            <Button onClick={onClick} color="info" variant="contained">
              View
            </Button>
          </div>
        );
      }
    }
  ]
  return( 
    <>
      <DataGrid
        rows={dataForTable}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
      <DoctorViewPatient open={open} onClose={closeModal} patientId={selectedPatientId} doctorId={doctorId}/>
  </>
  )

}