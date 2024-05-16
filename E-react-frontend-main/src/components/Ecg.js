import React,{useState, useEffect}  from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../styles/components/Ecg.css'
const ECGDataPlot = ({ }) => {
  // Your ECG data points
  const ecgData = [
    0.685422003, 0.112531967, 0.046035804, 0.061381076, 0.071611255, 0.010230179,
    0.04859335, 0.005115089, 0.046035804, 0.020460358, 0.053708442, 0.030690538,
    0.040920716, 0.046035804, 0.03836317, 0.03836317, 0.05882353, 0.109974422,
    0.132992327, 0.05882353, 0.166240409, 0.156010225, 0.194373399, 0.189258307,
    0.225063935, 0.21227622, 0.222506389, 0.242966756, 0.145780057, 0.115089513,
    0.025575448, 0.05882353, 0.074168801, 0.06905371, 0.063938618, 0.074168801,
    0.07672634, 0.0, 0.107416883, 0.020460358, 0.043478262, 0.0971867, 0.06905371,
    0.040920716, 0.094629154, 0.107416883, 0.0971867, 0.112531967, 0.176470593,
    0.194373399, 0.150895134, 0.109974422, 0.092071608, 0.117647059, 0.04859335,
    0.03836317, 0.079283886, 0.066496164, 0.092071608, 0.094629154, 0.092071608,
    0.07672634, 0.342711002, 0.710997462, 1.0, 0.557544768, 0.071611255, 0.053708442,
    0.086956523, 0.074168801, 0.092071608, 0.107416883, 0.04859335, 0.084398977,
    0.115089513, 0.102301791, 0.122762151,  ];

    

  // Transform the ECG data into a format that Recharts can use
  const formattedData = ecgData.map((value, index) => ({ time: index, voltage: value }));
  const [windowStart, setWindowStart] = useState(0);
  const windowSize = 50; // Adjust this to show more or less data at a time

  useEffect(() => {

    const updateWindow = () => {
      setWindowStart((currentStart) => {
        // Move the window forward, looping back to the start when reaching the end of the data
        const nextStart = (currentStart + 1) % (ecgData.length - windowSize);
        return nextStart;
      });
    };

    const interval = setInterval(updateWindow, 100); // Adjust the delay for the animation speed

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [ecgData.length]);

  const chartData = formattedData.slice(windowStart, windowStart + windowSize);

  return (
    <div className="ecg-chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tickLine={false} axisLine={false} />
          <YAxis domain={['auto', 'auto']} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Line type="monotone" dataKey="voltage" stroke="#82ca9d" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const tooltipStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  border: 'none',
  borderRadius: '5px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
};

export default ECGDataPlot;
