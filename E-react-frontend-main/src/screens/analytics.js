import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend, ResponsiveContainer } from 'recharts';
import '../styles/screens/Analytic.css';
import { uniqueId } from 'lodash'; // You can use lodash's uniqueId for unique keys
import  ECGDataPlot from '../components/Ecg'
const Analytic = () => {
  const [data, setData] = useState([]);
  const [doctorData, SetDoctorData] = useState([]);
  const [currentChartData, setCurrentChartData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('genderDistribution');
  const [alzheimersData, setAlzheimersData] = useState([]);
  const [allDiseaseData, SetAllDiseaseData] = useState([]);
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F", "#FFBB28", "#FF8042"];

  const uniqueDiseases = [...new Set(allDiseaseData.map(item => item.table_name))];
  const diseaseColorMap = uniqueDiseases.reduce((acc, disease, index) => {
    acc[disease] = colors[index % colors.length];
    return acc;
  }, {});


  useEffect(() => {
    const fethPatientData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/patientsRegistration');
        setData(response.data);
        processChartData(response.data, selectedFilter);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/doctorsRegistration');
        SetDoctorData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchAlzheimersData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/alzheimers');
        setAlzheimersData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchAllDiseaseData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/combinedPredictions');
        SetAllDiseaseData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    fethPatientData();
    fetchDoctorData();
    fetchAlzheimersData();
    fetchAllDiseaseData();
  }, [selectedFilter]);


  useEffect(() => {
    // ... other data fetching
    if (data.length > 0 && alzheimersData.length > 0) {
      processChartData(data, selectedFilter);
    }
  }, [selectedFilter, data, alzheimersData]); // Add alzheimersData as a dependency

  const processChartData = (data, filter) => {
    let processedData = [];
    switch (filter) {
      case 'genderDistribution':
        const genderCount = data.reduce((acc, patient) => {
          acc[patient.Gender] = (acc[patient.Gender] || 0) + 1;
          return acc;
        }, {});
        processedData = Object.keys(genderCount).map(key => ({ name: key, value: genderCount[key] }));
        break;

      case 'ageDistribution':
        // Assuming age groups like <20, 20-40, 40-60, 60+
        const ageGroups = { '<20': 0, '20-40': 0, '40-60': 0, '60+': 0 };
        data.forEach(patient => {
          if (patient.Age < 20) ageGroups['<20']++;
          else if (patient.Age >= 20 && patient.Age < 40) ageGroups['20-40']++;
          else if (patient.Age >= 40 && patient.Age < 60) ageGroups['40-60']++;
          else ageGroups['60+']++;
        });
        processedData = Object.keys(ageGroups).map(key => ({ name: key, value: ageGroups[key] }));
        break;

      case 'cityDistribution':
        const cityCount = data.reduce((acc, patient) => {
          acc[patient.City] = (acc[patient.City] || 0) + 1;
          return acc;
        }, {});
        processedData = Object.keys(cityCount).map(city => ({ name: city, value: cityCount[city] }));
        break;
      case 'bloodGroupDistribution':
        const bloodGroupCount = data.reduce((acc, patient) => {
          acc[patient.BloodGroup] = (acc[patient.BloodGroup] || 0) + 1;
          return acc;
        }, {});
        processedData = Object.keys(bloodGroupCount).map(key => ({ name: key, value: bloodGroupCount[key] }));
        break;

      case 'heightDistribution':
        // Process data for height distribution (assuming you want to categorize the heights)
        // This is a placeholder logic, categorize according to your data
        const heightCategories = { 'Short': 0, 'Medium': 0, 'Tall': 0 };
        data.forEach(patient => {
          if (patient.Height < 160) heightCategories['Short']++;
          else if (patient.Height >= 160 && patient.Height < 180) heightCategories['Medium']++;
          else if (patient.Height >= 180) heightCategories['Tall']++;
        });
        processedData = Object.keys(heightCategories).map(key => ({ name: key, value: heightCategories[key] }));
        break;

      case 'weightDistribution':
        // Process data for weight distribution (assuming you want to categorize the weights)
        // This is a placeholder logic, categorize according to your data
        const weightCategories = { 'Underweight': 0, 'Normal': 0, 'Overweight': 0, 'Obese': 0 };
        data.forEach(patient => {
          if (patient.Weight < 50) weightCategories['Underweight']++;
          else if (patient.Weight >= 50 && patient.Weight < 70) weightCategories['Normal']++;
          else if (patient.Weight >= 70 && patient.Weight < 90) weightCategories['Overweight']++;
          else if (patient.Weight >= 90) weightCategories['Obese']++;
        });
        processedData = Object.keys(weightCategories).map(key => ({ name: key, value: weightCategories[key] }));
        break;

      case 'specializationDistribution':
        const specializationCount = doctorData.reduce((acc, doctor) => {
          acc[doctor.Specialization] = (acc[doctor.Specialization] || 0) + 1;
          return acc;
        }, {});
        processedData = Object.keys(specializationCount).map(key => ({ name: key, value: specializationCount[key] }));
        break;

      case 'predictionDistribution':
        const predictionCounts = alzheimersData.reduce((acc, record) => {
          const date = new Date(record.prediction_date).toLocaleDateString();
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});
        processedData = Object.keys(predictionCounts).map(date => ({
          name: date,
          value: predictionCounts[date],
        }));
        break;

      case 'accuracyDistribution':
        // Assuming you want to categorize accuracy ranges
        const accuracyRanges = { '<90%': 0, '90-95%': 0, '95-100%': 0 };
        alzheimersData.forEach(record => {
          const accuracy = parseFloat(record.accuracy);
          if (accuracy < 90) accuracyRanges['<90%']++;
          else if (accuracy >= 90 && accuracy < 95) accuracyRanges['90-95%']++;
          else if (accuracy >= 95) accuracyRanges['95-100%']++;
        });
        processedData = Object.keys(accuracyRanges).map(range => ({
          name: range,
          value: accuracyRanges[range],
        }));
        break;

      case 'recordTypeDistribution':
        const recordTypeCounts = alzheimersData.reduce((acc, record) => {
          acc[record.record_type] = (acc[record.record_type] || 0) + 1;
          return acc;
        }, {});
        processedData = Object.keys(recordTypeCounts).map(type => ({
          name: type,
          value: recordTypeCounts[type],
        }));
        break;

      case 'alzheimersPrediction':
        processedData = alzheimersData.map(record => ({
          name: `${record.patient_id}`,
          value: parseInt(record.prediction, 10)
        }));
        break;

      case 'combinedDistribution':
        // processedData = allDiseaseData.map(record => ({
        //   name: `${record.patient_id}`,
        //   value: parseInt(record.prediction, 10),
        //   disease: `${record.table_name}`,
        // }));

        const patientDiseaseData = allDiseaseData.reduce((acc, record) => {
          const patientId = `Patient ${record.patient_id}`;
          if (!acc[patientId]) {
            acc[patientId] = { name: patientId };
            uniqueDiseases.forEach(disease => {
              acc[patientId][disease] = 0; // Initialize each disease prediction as 0
            });
          }
          acc[patientId][record.table_name] = parseInt(record.prediction, 10); // Set the prediction for the disease
          return acc;
        }, {});

        processedData = Object.values(patientDiseaseData);
        break;
      // case 'combinedDistribution':
      //   // Create an object where each key is a patient ID and each value is an object with predictions for each disease
      //   const patientPredictions = {};
      //   allDiseaseData.forEach(record => {
      //     if (!patientPredictions[record.patient_id]) {
      //       patientPredictions[record.patient_id] = { patientId: `Patient ${record.patient_id}` };
      //     }
      //     patientPredictions[record.patient_id][record.table_name] = parseInt(record.prediction, 10);
      //   });

      //   processedData = Object.values(patientPredictions);
      //   break;

      // case 'combinedDistribution':
      //   const patientPredictions = allDiseaseData.reduce((acc, record) => {
      //     if (!acc[record.patient_id]) {
      //       acc[record.patient_id] = {
      //         name: `${record.patient_id}`,
      //         value: 0
      //       };
      //     }
      //     acc[record.patient_id].value += parseInt(record.prediction, 10);
      //     return acc;
      //   }, {});

      //   processedData = Object.values(patientPredictions);
      //   break;

      default:
        // Default case if needed
        processedData = [];

    }

    setCurrentChartData(processedData);
  };

  const handleFilterChange = (newFilter) => {
    setSelectedFilter(newFilter);
    processChartData(data, newFilter);
  };
  const renderColorfulLegendText = (value, entry) => {
    const { color } = entry;
    return <span style={{ color }}>{value}</span>;
  };
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Patient ID: ${label}`}</p>
          {payload.map((data, index) => (
            <p key={index} style={{ color: data.stroke }}>
              {`${data.name}: ${data.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  return (
    <div className='chart-container'>
      <h1 className='chart-title'>Data Visualization Dashboard</h1>

      <div className='chart-buttonContainer'>
        <button className='chart-button' onClick={() => handleFilterChange('genderDistribution')}>Gender Distribution</button>
        <button className='chart-button' onClick={() => handleFilterChange('ageDistribution')}>Age Distribution</button>
        <button className='chart-button' onClick={() => handleFilterChange('cityDistribution')}>City Distribution</button>
        <button className='chart-button' onClick={() => handleFilterChange('bloodGroupDistribution')}>Blood Group Distribution</button>
        <button className='chart-button' onClick={() => handleFilterChange('heightDistribution')}>Height Distribution</button>
        <button className='chart-button' onClick={() => handleFilterChange('weightDistribution')}>Weight Distribution</button>
        <button className='chart-button' onClick={() => handleFilterChange('specializationDistribution')}>Specialization Distribution</button>
        <button className='chart-button' onClick={() => handleFilterChange('predictionDistribution')}>
          Prediction Distribution
        </button>
        <button className='chart-button' onClick={() => handleFilterChange('accuracyDistribution')}>
          Accuracy Distribution
        </button>
        <button className='chart-button' onClick={() => handleFilterChange('recordTypeDistribution')}>
          Record Type Distribution
        </button>
        <button className='chart-button' onClick={() => handleFilterChange('combinedDistribution')}>
          All Disease Distribution
        </button>
      </div>

      <button className="chart-button" onClick={() => handleFilterChange('alzheimersPrediction')}>
        Alzheimer's Predictions
      </button>

      <div className='chart-chartContainer'>
        <h3 className='chart-subtitle'> User Insights</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={currentChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend formatter={renderColorfulLegendText} />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>


      </div>
      <div className='chart-chartContainer'>
        <h3 className='chart-subtitle'>Service Ml Insights</h3>

        <ResponsiveContainer width="100%" height={300}>

          <LineChart data={currentChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 1]} />
            <Tooltip />
            <Legend />
            {
              uniqueDiseases.map(disease => (
                <Line
                  key={disease}
                  type="monotone"
                  dataKey={disease}
                  stroke={diseaseColorMap[disease]}
                  name={disease}
                  dot={false} // if you want to hide the dots
                  activeDot={{ r: 8 }} // if you want to highlight the active dot on hover
                />
              ))
            }
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div>
      <h1>ECG Data Plot</h1>
      <ECGDataPlot />
    </div>
    </div>
  );
};

export default Analytic;
