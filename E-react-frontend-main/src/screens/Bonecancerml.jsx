import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { BASE_URL } from "../constants";
import "../styles/screens/boneMl.css";

function Boneml() {
  const patientInfo = useSelector((state) => state.patientInfo);
  const [boneData, setBoneData] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [predictionLoader, setPredictionLoader] = useState(false);

  useEffect(() => {
    async function getBoneData() {
      try {
        const { id } = patientInfo;
        const { data } = await axios.get(`${BASE_URL}/boneData/${id}`);
        setBoneData(data);
      } catch (err) {
        console.error("Error fetching bone data:", err);
      }
    }

    if (patientInfo.id) {
      getBoneData();
    }
  }, [patientInfo]);

  async function predict(base64Image) {
    setPredictionLoader(true);
    try {
      const formData = new FormData();
      const blob = await (async () => {
        return new Promise((resolve) => {
          const binaryData = atob(base64Image);
          const arrayBuffer = new ArrayBuffer(binaryData.length);
          const uint8Array = new Uint8Array(arrayBuffer);

          for (let i = 0; i < binaryData.length; i++) {
            uint8Array[i] = binaryData.charCodeAt(i);
          }

          const blob = new Blob([uint8Array], { type: "image/jpeg" });
          resolve(blob);
        });
      })();

      if (blob instanceof Blob) {
        formData.append("file", blob, "image.jpg");
        const { data } = await axios.post(
          "https://bonecancerml-2307992bf352.herokuapp.com/predict",
          formData
        );
        setPrediction(data.prediction);
      } else {
        console.error("Invalid blob type");
        throw new Error("Invalid blob type");
      }
    } catch (error) {
      console.error("Error during prediction:", error);
      setPrediction(null);
    } finally {
      setPredictionLoader(false);
    }
  }

  // Renders the prediction cell based on various conditions
  function renderPredictionCell() {
    if (predictionLoader) {
      return <div>Loading...</div>;
    }

    if (!prediction && boneData) {
      return (
        <button
          className="predictButton"
          onClick={() => predict(boneData.file.buffer)}
          disabled={predictionLoader}
        >
          Predict
        </button>
      );
    }

    if (prediction !== undefined && prediction !== null) {
      return <div>{prediction}</div>;
    }

    return null;
  }

  // Saves the prediction to the backend
  async function savePrediction() {
    try {
      const url = `${BASE_URL}/boneData/${patientInfo.id}`;
      const requestData = {
        prediction: prediction,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(url, requestData, config);
      console.log("Prediction saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving prediction:", error);
    }
  }

  return (
    <div className="bone-page">
      <table className="bone-container">
        <thead>
          <tr>
            <th>Patient Information</th>
            <th>X-Ray Image</th>
            <th>Previous Prediction</th>
            <th>Prediction</th>
          </tr>
        </thead>
        <tbody className="table-contents">
          <tr>
            <td>
              {patientInfo.FName} {patientInfo.MName} {patientInfo.LName}
            </td>
            <td>
              {boneData && (
                <img
                  src={`data:image/jpeg;base64,${boneData.file.buffer}`}
                  alt="X-Ray Image"
                  width="150"
                  height="150"
                />
              )}
            </td>
            <td>{boneData ? boneData.prediction : null}</td>
            <td>{renderPredictionCell()}</td>
          </tr>
        </tbody>
      </table>
      {prediction ? (
        <button className="saveButton" onClick={() => savePrediction()}>
          Save
        </button>
      ) : null}
    </div>
  );
}

export default Boneml;
