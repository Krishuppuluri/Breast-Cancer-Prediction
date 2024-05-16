import * as React from 'react';
import Button from '@mui/material/Button';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DoctorViewPatient } from './DoctorViewPatient';

  
export default function DocRecordsAuth({doctorId}){
  const [dataForTable, setDataForTable]= useState([]);  
  const [open, setOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);



  const columns = [
    { field: 'id', headerName: 'ID', width: 90, flex: 0.5 },
    { field: 'FName', headerName: 'First Name', flex: 1 },
    { field: 'MI', headerName: 'M.I.', flex: 0.5 },
    { field: 'LName', headerName: 'Last Name', flex: 1 },
    { field: 'MobileNumber', headerName: 'Phone', flex: 1 },
    { field: 'Age', headerName: 'Age', flex: 0.5 },
    { field: 'Gender', headerName: 'Gender', flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          viewPatientHandler(params.row.id);
        };

        return (
          <div>
            <Button onClick={onClick} color="info" variant="contained">
              View
            </Button>
          </div>
        );
      },
    },
  ];
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
        //http://localhost:8080
        //https://e-react-node-backend-22ed6864d5f3.herokuapp.com
        const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/DoctorPatientsAuthorized', {
          doctorId
        });
        const { data } = response;
        if (data.error) {
          alert(JSON.stringify(data.error));
          console.log("error ")
        } else {
          console.log("data", data)
          setDataForTable(data)
        }
      } catch (error) {
        console.log(`Error With request getting auth  recent : ${error.message}`);
      }
    };
    getData();
  },[doctorId]);

  return( 
    <div style={{ width: '100%', height: '60vh', minHeight: '400px' }}>
      <DataGrid
        rows={dataForTable}
        columns={columns}
        slots={{toolbar: GridToolbar }}
        slotProps={{
          toolbar:{
            showQuickFilter:true,
          },
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5,10,25,100]}
        disableColumnFilter={true}
        disableDensitySelector={true}
  
      />
      <DoctorViewPatient open={open} onClose={closeModal} patientId={selectedPatientId} doctorId={doctorId} />
      </div>
  )

}