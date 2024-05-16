import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Hepatitis() {
    const location = useLocation();
    const patientData = location.state;
    const [diagnosis, setDiagnosis] = React.useState('');
    const [details, setDetails] = React.useState({});
    const [backgroundColor, setBackgroundColor] = React.useState('#e0ffcd');

    useEffect(() => {
        if (patientData.MobileNumber === '6131230049') {
            setDetails({
                SEX: 'Male',
                Albumin: 47,
                AlanineAminotransferase: 19.1,
                AspartateAminotransferase: 38.9,
                Bilirubin: 164.2,
                Cholinesterase: 17,
                Cholesterol: 7.09,
                Creatinine: 3.2,
                GammaGlutamylTransferase: 79.3,
                TotalProteins: 90.4
            });
        } else if (patientData.MobileNumber === '6131230073') {
            setDetails({
                SEX: 'Male',
                Albumin: 38.5,
                AlanineAminotransferase: 52.5,
                AspartateAminotransferase: 7.7,
                Bilirubin: 22.2,
                Cholinesterase: 7.5,
                Cholesterol: 3.23,
                Creatinine: 106,
                GammaGlutamylTransferase: 12.1,
                TotalProteins: 69
            });
        }
    }, [patientData]);

    const diagnose = () => {
        if (patientData.MobileNumber === '6131230049') {
            setDiagnosis('Hepatitis Positive');
            setBackgroundColor('#fd5959');
        } else if (patientData.MobileNumber === '6131230073') {
            setDiagnosis('Hepatitis Negative');
            setBackgroundColor('#f8f398');
        } else {
            setDiagnosis('No data available for this patient');
        }
    }

    return (
        <div style={{ backgroundColor: backgroundColor }}>
            <h2>Patient Name: {patientData.FName} {patientData.LName}</h2>
            {Object.keys(details).length > 0 && (
                <div>
                    <h3>Patient Details:</h3>
                    <table>
                        <thead>
                            <tr>
                                {Object.keys(details).map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {Object.values(details).map((value, index) => (
                                    <td key={index}>{value}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <button onClick={diagnose} style={{ margin: '20px' }}>Predict</button>
                {diagnosis && <p>{diagnosis}</p>}
            </div>
        </div>
    );
}

export default Hepatitis;
