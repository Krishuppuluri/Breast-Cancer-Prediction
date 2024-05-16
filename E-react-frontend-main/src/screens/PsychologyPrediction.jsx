import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import '../styles/screens/PsychologyPrediction.css';
import axios from "axios";
import { Table, Button } from 'antd';

const API_ROOT = `https://e-react-node-backend-22ed6864d5f3.herokuapp.com`;  //TODO: Need to replace with the backend server address
const PSYCHOLOGY_API_ENDPOINT = `https://qiaoyueelg6131-d5b2bc1de4d5.herokuapp.com/api/getMLResult/`;

const mappings = {
  "Gender": { "0": "Female", "1": "Male", "2": "Other" },
  "self_employed": { "1": "Yes", "0": "No" },
  "family_history": { "0": "No", "1": "Yes" },
  "work_interfere": { "2": "Often", "3": "Rarely", "1": "Never", "4": "Sometimes" },
  "no_employees": { "4": "6-25", "5": "More than 1000", "2": "26-100", "1": "100-500", "0": "1-5", "3": "500-1000" },
  "remote_work": { "0": "No", "1": "Yes" },
  "tech_company": { "1": "Yes", "0": "No" },
  "benefits": { "2": "Yes", "0": "Don't know", "1": "No" },
  "care_options": { "1": "Not sure", "0": "No", "2": "Yes" },
  "wellness_program": { "1": "No", "0": "Don't know", "2": "Yes" },
  "seek_help": { "2": "Yes", "0": "Don't know", "1": "No" },
  "anonymity": { "2": "Yes", "0": "Don't know", "1": "No" },
  "leave": { "2": "Somewhat easy", "0": "Don't know", "1": "Somewhat difficult", "3": "Very difficult", "4": "Very easy" },
  "mental_health_consequence": { "1": "No", "0": "Maybe", "2": "Yes" },
  "phys_health_consequence": { "1": "No", "2": "Yes", "0": "Maybe" },
  "coworkers": { "1": "Some of them", "0": "No", "2": "Yes" },
  "supervisor": { "2": "Yes", "0": "No", "1": "Some of them" },
  "mental_health_interview": { "1": "No", "2": "Yes", "0": "Maybe" },
  "phys_health_interview": { "0": "Maybe", "1": "No", "2": "Yes" },
  "mental_vs_physical": { "2": "Yes", "0": "Don't know", "1": "No" },
  "obs_consequence": { "0": "No", "1": "Yes" }
};

const PsychologyPrediction = () => {
  const location = useLocation();
  const patientId = location.state ? location.state.id : '143';

  const [predictionData, setPredictionData] = useState({});
  const [groupedTableData, setGroupedTableData] = useState([]);
  const [Psychology, setPsychology] = useState();

  const columnGroups = [
    ["patient_id", "Gender", "Age", "self_employed", "family_history"],
    ["no_employees", "remote_work", "tech_company", "benefits", "work_interfere"],
    ["care_options", "wellness_program", "seek_help", "anonymity"],
    ["leave", "mental_health_consequence", "phys_health_consequence", "coworkers"],
    ["supervisor", "mental_health_interview", "phys_health_interview", "mental_vs_physical", "obs_consequence"]
  ];


  useEffect(() => {
    (async () => {
      const response = await axios.get(`${API_ROOT}/psychology/${patientId}`);
      setPredictionData(response.data);

      const structuredData = structureDataForGroups(response.data);
      setGroupedTableData(structuredData);
    })();
  }, [patientId]);

  const renderText = (text, record, index, fieldName) => {
    return mappings[fieldName] && mappings[fieldName][text]
      ? mappings[fieldName][text]
      : text;
  };

  const structureDataForGroups = (data) => {
    return columnGroups.map((group, index) => ({
      key: index,
      ...group.reduce((obj, columnName) => {
        obj[columnName] = data[columnName];
        return obj;
      }, {})
    }));
  };

  const generateColumnsForGroup = (group) => {
    return group.map(columnName => ({
      title: columnName.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase()),
      dataIndex: columnName,
      key: columnName,
      render: (text, record, index) => renderText(text, record, index, columnName)
    }));
  };

  const predictPsychology = async () => {
    const predictionResponse = await axios.post(PSYCHOLOGY_API_ENDPOINT, predictionData);
    setPsychology(predictionResponse.data);
  };

  return (
    <React.Fragment>
      <div className="ant-table-container">
        {groupedTableData.map((data, index) => (
          <Table
            key={`table-group-${index}`}
            size="small"
            columns={generateColumnsForGroup(columnGroups[index])}
            dataSource={[data]}
            pagination={false}
            bordered
          />
        ))}
      </div>

      <div className="button-and-result-container">
        <Button className="diagnose-button" onClick={predictPsychology}>
          Diagnose
        </Button>
        {Psychology && (
          <div className="result-display">
            <span className="result-text">
              {Psychology.Result[0] === 0 ? "Does not need psychiatric treatment" : "Needs psychiatric treatment"}
            </span>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default PsychologyPrediction;