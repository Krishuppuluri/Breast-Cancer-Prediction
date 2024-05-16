import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, fetchPatientRegistration } from '../redux/actions/userActions';
import '../styles/screens/DBConnection.css';

function DBConnection() {
  const dispatch = useDispatch();
  const tableNames = useSelector((state) => state.user.users);
  const patientRegistrationData = useSelector((state) => state.user.patientRegistrationData);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    // Check if tableNames have data, then show the table
    if (tableNames.length > 0) {
      setShowTable(true);
    } else {
      setShowTable(false);
    }
  }, [tableNames]);

  const handleFetchTables = () => {
    // Clear the patient registration data and show loading state
    setShowTable(false);

    dispatch(fetchUsers());
  };

  const handleFetchPatientRegistration = () => {
    // Clear the table and show loading state
    setShowTable(false);

    dispatch(fetchPatientRegistration());
  };

  return (
    <div>
      <h1>Database Tables</h1>
      <button type="button" onClick={handleFetchTables}>
        Fetch Tables
      </button>
      <button type="button" onClick={handleFetchPatientRegistration}>
        Fetch Patient Registration
      </button>
      {showTable && (
        <ul>
          {tableNames.map((tableName) => (
            <li key={tableName}>{tableName}</li>
          ))}
        </ul>
      )}
      {patientRegistrationData.length > 0 && (
        <div>
          <h2>Patient Registration Data</h2>
          <ul>
            {patientRegistrationData.map((patient) => (
              <li key={patient.id}>
                {/* Display patient name and ID */}
                <p>ID: {patient.id}</p>
                <p>Name: {`${patient.FName} ${patient.LName}`}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DBConnection;
