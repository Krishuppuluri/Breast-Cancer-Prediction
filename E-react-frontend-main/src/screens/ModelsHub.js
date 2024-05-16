import React, { useState } from 'react';
import '../styles/screens/ModelsHub.css';
import Banner from '../components/Banner';
import ModelCard from '../components/card';
import models from '../components/Data/modelData'
import '../styles/components/chart.css'
import { Grid, Tabs, Tab, Card, CardContent, Typography, Box } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, } from 'recharts';
import SwipeableViews from 'react-swipeable-views';

const modelUsageData = [
  { name: 'Heart Disease', runs: 400 },
  { name: 'Diabetes', runs: 350 },
  { name: 'Cancer Detection', runs: 220 },
  { name: 'Lung Function', runs: 280 },
  { name: 'Stroke Risk', runs: 310 },
  { name: 'Bone Density', runs: 265 },
  { name: 'Mental Health', runs: 295 },
  // ... you can add more models if required
];

const modelDistributionData = [
  { name: 'Heart Disease', value: 400 },
  { name: 'Diabetes', value: 350 },
  { name: 'Cancer Detection', value: 220 },
  { name: 'Lung Function', value: 280 },
  { name: 'Stroke Risk', value: 310 },
  { name: 'Bone Density', value: 265 },
  { name: 'Mental Health', value: 295 },
  // ... you can add more models if required
];
function Divider() {
  return <div style={{height: '1px', backgroundColor: 'grey', margin: '16px 0',}}></div>;
}

const HealthcareModels = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const filteredModels = models.filter(model =>
    model.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleChangeIndex = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="healthcare-models-container">
      <h1 className='title'>Healthcare Prediction Models Hub</h1>
      <Banner onSearchChange={onSearchChange} />
      <div style = {{padding:"30px"}}>
      <Divider/>
      </div>
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <h2 className='title'>List of Healthcare Prediction Models:</h2>
          <div className="models-grid">
            {filteredModels.map((model, index) => (
              <ModelCard key={index} {...model} />
            ))}
          </div>
        </Grid>

        <Grid item xs={12} md={5}>
          <h2 className='title'>Analytics Section</h2>
          <Tabs value={activeTab} onChange={handleChange} indicatorColor="primary" textColor="primary">
            <Tab label="Model Usage Metrics" />
            <Tab label="Graphical Representation" />
          </Tabs>
          <SwipeableViews index={activeTab} onChangeIndex={handleChangeIndex}>
            <Box mb={4}>
              <Card elevation={3} className='ChartCard' > {/* elevation for the card effect */}
                <CardContent className='cardContent'>
                  <Typography variant="h5" gutterBottom>
                    Model Usage Metrics
                  </Typography>
                  <BarChart width={500} height={300} data={modelUsageData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="runs" fill="#8884d8" />
                  </BarChart>
                </CardContent>
              </Card>
            </Box>
            <Box mb={4}>
              <Card elevation={3} className='ChartCard'>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Graphical Representation
                  </Typography>
                  <PieChart width={500} height={300}>
                    <Pie data={modelDistributionData} cx={200} cy={200} outerRadius={90} fill="#8884d8" dataKey="value">
                      {
                        modelDistributionData.map((entry, index) => <Cell key={`cell-${index}`} fill={["#8884d8", "#82ca9d", "#ffc658"][index % 3]} />)
                      }
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </CardContent>
              </Card>
            </Box>
          </SwipeableViews>

        </Grid>
      </Grid>

    </div>
  );
}

export default HealthcareModels;
