import React, {useRef, useEffect, useState} from "react";
import Plot from 'react-plotly.js';
import '../styles/screens/StrainSim.css';
import'./logger.py'
import Papa from "papaparse"
import { useCSVReader } from 'react-papaparse';
import testData from './testData.csv'
import testData2 from './data.csv'
import totalData from './total_data.csv'
import { Bar } from 'react-chartjs-2'
import {Line} from 'react-chartjs-2'
import 'chart.js/auto'
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    LineElement,
    BarElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';


ChartJs.register(
    CategoryScale, // x axis
    LinearScale, // y axis
    LineElement,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
)

// this is the main function of the code, the strain camera
function StrainCamera() {
    const [chartData,setChartData] = useState({
        datasets: []
    });
    const [chartOptions, setChartOptions] = useState({})

    const [chartDataTotal,setChartDataTotal] = useState({
        datasets: []
    });
    const [chartOptionsTotal, setChartOptionsTotal] = useState({})

    const [show,setShow] = useState(true);
    const [showTotalPlot,setShowTotalPlot] = useState(true);
    // define base variables. By default, they are null
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const [hasPhoto, setHasPhoto] = useState(false);

    // setting the default video that we want. Default is a 1080P webcam display
    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({video: {width: 1280, height: 720}})

            .then(stream => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch(err =>{
                console.error(err);
            })
    }

    // collect the current video camera display
    useEffect(() => {
        getVideo();
    }, [videoRef])

    // parse instant strain data
     useEffect(()=>{
        Papa.parse(testData2,{
            download:true,
            header: true,
            dynamicTyping: true,
            delimiter: ",",
            complete: ((result) =>{
                console.log(result)
                // set test value
                let strainValue = result.data.map((item, index) =>[item['Strain']]).filter(Number)
                var colors = []
                for(var i = 0; i < strainValue.length; i++){
                   var color;
                   if(strainValue[i] < 600) {
                       color = "blue";
                   }else{
                       color = "red";
                       }
                   colors[i] = color;
                   }
                setChartData({
                    labels:result.data.map((item, index) =>[item["Time"]]).filter(String),
                    datasets: [
                        {
                            label:"Strain",
                            data: result.data.map((item, index) =>[item['Strain']]).filter(Number),
                            borderColor: "black",
                            backgroundColor: colors,
                            yaxisID: 'y'
                        }
                    ]
                });
                setChartOptions({
                    //responsive: true,
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        title:{
                            display:true,
                            text:"Test data"
                        },
                    }
                })
            })

        })
    }, [])

    // parse instant strain data
     useEffect(()=>{
        Papa.parse(totalData,{
            download:true,
            header: true,
            dynamicTyping: true,
            delimiter: ",",
            complete: ((result_total) =>{
                console.log(result_total)
                // set test value
                let strainValue = result_total.data.map((item, index) =>[item['Strain']]).filter(Number)
                var colors = []
                for(var i = 0; i < strainValue.length; i++){
                   var color;
                   if(strainValue[i] < 600) {
                       color = "blue";
                   }else{
                       color = "red";
                       }
                   colors[i] = color;
                   }
                setChartDataTotal({
                    labels:result_total.data.map((item, index) =>[item["Time"]]).filter(String),
                    datasets: [
                        {
                            label:"Strain",
                            data: result_total.data.map((item, index) =>[item['Strain']]).filter(Number),
                            borderColor: "black",
                            backgroundColor: colors,
                            yaxisID: 'y'
                        }
                    ]
                });
                setChartOptionsTotal({
                    //responsive: true,
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        title:{
                            display:true,
                            text:"Test data"
                        },
                    }
                })
            })

        })
    }, [])




    // now for the layout. We want the strain camera, the plot, and a toggle button
    return (
        <div className='strain_camera'>
            <div className='camera' style={{ display: "flex" }}>
                <video className='video_output' ref={videoRef}> </video>
                <div>
                    <Bar className='small_plot' options={chartOptions} data={chartData} style={{display:"flex"}}/>
                    {show ?<Bar className='total_plot' options={chartOptionsTotal} data={chartDataTotal} style={{display:"flex"}}/>:null}
                </div>
            </div>
            <div className='button_div'>
                <div className='button-container'>
                    <button onClick={()=>setShow(true)}>Start Plot</button>
                    <button onClick={()=>setShow(false)}>Stop Plot</button>
                </div>
            </div>
        </div>

    );
}


export default StrainCamera;
