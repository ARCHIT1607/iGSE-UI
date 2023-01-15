import "../css/Analytics.css";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";

import { Bar } from "react-chartjs-2";
import { Col, Container, Row } from "react-bootstrap";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  // responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Analytics",
    },
  },
};

function Analytics() {
    useEffect(() => {
      getAllMeterReadings();
    }, []);

    let cred = localStorage.getItem("jwt");

    const [meterReadings, setMeterReadings] = useState([]);

    const getAllMeterReadings = async () => {
      //Prevent page reload
      const labelSet = [];
      const dataSet1 = [];
      const dataSet2 = [];
      const dataSet3 = [];
      console.log("in get all meter readings");
      await Axios.get(window.API_URL+"/admin/meterReadings", {
        headers: {
          Authorization: "Bearer " + cred,
        },
      })
        .then((response) => {
          console.log(response.data);
          const res = response.data;
          return res;
        })
        .then((res) => {
          console.log("ressss", res);
          for (const val of res) {
            dataSet1.push(val.eMeterReadingDay);
            dataSet2.push(val.eMeterReadingNight);
            dataSet3.push(val.gMeterReading);
            labelSet.push(val.submissionDate);
          }
          setData({
            labels: labelSet,
            datasets: [
              {
                label: "Electric reading day",
                data: dataSet1,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(99, 132, 0.5)",
              },
              {
                label: "Electric reading night",
                data: dataSet2,
                borderColor: "rgb(553, 235, 0.5)",
                backgroundColor: "rgba(53, 235, 0.5)",
              },
              {
                label: "Gas reading",
                data: dataSet3,
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgb(255, 99, 132)",
              },
            ],
          });
          console.log("arrData", dataSet1, dataSet2);
        });
    };

    const [data, setData] = useState({
      datasets: [
        {
          label: "Dataset 1",
          data: [],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(25, 90, 13, 0.5)",
        },
        {
          label: "Dataset 2",
          data: [],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    });


  return (
    <Container id="analyticContainer" className="mt-3" >
      <Line id="bar1" data={data} options={options} height={100}/>
    </Container>
  );
}

export default Analytics;
