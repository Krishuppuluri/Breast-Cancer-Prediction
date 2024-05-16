import React, { useState } from 'react';
import "../styles/screens/ThyroidModel.css";

function ThyroidPredictor() {
  const [formData, setFormData] = useState({
    age: 30,
    sex: 0,
    TSH: 478,
    T3: 10.6,
    T4U: 2.12,
    FTI: 2,
    onthyroxine: 2,
    queryonthyroxine: 9,
    onantithyroidmedication: 2,
    sick: 1,
    pregnant: 0,
    thyroidsurgery: 1,
    I131treatment: 1,
    queryhypothyroid: 1,
    queryhyperthyroid: 1,
    lithium: 1,
    goitre: 1,
    tumor: 1,
    hypopituitary: 0,
    psych: 1
  });
  const [result, setResult] = useState(null);
  const [useAlternativeApi, setUseAlternativeApi] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: parseInt(value, 10)
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Ensure you replace the URL with the correct endpoint
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };

    const apiEndpoint = useAlternativeApi
    ? ""
    : "https://thyroid-api-830c8b828570.herokuapp.com/predict";

    fetch(apiEndpoint, requestOptions)
      .then(response => response.json())
      .then(data => setResult(data))
      .catch(error => console.log('error', error));
  }

  // Create form inputs dynamically
  const createInputField = (name, label) => (
    <div key={name} className="input-group">
      <label htmlFor={name}>{label}</label>
      <input
        type="number"
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        placeholder={label}
      />
    </div>
  );

  return (
    <div className="thyroid-predictor-container">
      <h1 className="form-title">Thyroid Disease Predictor</h1> {/* Title added here */}
      {/* <div className="api-toggle">
        <label>
          Use Alternative API:
          <input
            type="checkbox"
            checked={useAlternativeApi}
            onChange={() => setUseAlternativeApi(!useAlternativeApi)}
          />
        </label>
      </div> */}
      <form onSubmit={handleSubmit} className="thyroid-form">
        <div className="form-row">
          {createInputField("age", "Age")}
          {createInputField("sex", "Sex (0 for Female, 1 for Male)")}
          {createInputField("TSH", "TSH (Thyroid-Stimulating Hormone)")}

        </div>
        <div className="form-row">
          {createInputField("T3", "T3 (Triiodothyronine)")}
          {createInputField("T4U", "T4U (Thyroxine Utilization Rate)")}
          {createInputField("FTI", "FTI (Free Thyroxine Index)")}
        </div>
        <div className="form-row">
          {createInputField("onthyroxine", "On Thyroxine (0 or 1)")}
          {createInputField("queryonthyroxine", "Query on Thyroxine (0 or 1)")}
          {createInputField("onantithyroidmedication", "On Antithyroid Medication (0 or 1)")}
        </div>
        <div className="form-row">
          {createInputField("sick", "Sick (0 or 1)")}
          {createInputField("pregnant", "Pregnant (0 or 1)")}
          {createInputField("thyroidsurgery", "Thyroid Surgery (0 or 1)")}
        </div>
        <div className="form-row">
          {createInputField("I131treatment", "I131 Treatment (0 or 1)")}
          {createInputField("queryhypothyroid", "Query Hypothyroid (0 or 1)")}
          {createInputField("queryhyperthyroid", "Query Hyperthyroid (0 or 1)")}
        </div>
        <div className="form-row">
          {createInputField("lithium", "Lithium (0 or 1)")}
          {createInputField("goitre", "Goitre (0 or 1)")}
          {createInputField("tumor", "Tumor (0 or 1)")}
        </div>
        <div className="form-row">
          {createInputField("hypopituitary", "Hypopituitary (0 or 1)")}
          {createInputField("psych", "Psych (0 or 1)")}
        </div>

        {/* ... Add more form rows as needed */}
        <div className="form-row">
          <button type="submit" className="submit-btn">Predict</button>
        </div>
      </form>

      {result && (
        <div className="result-section">
          <h3>Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ThyroidPredictor;
