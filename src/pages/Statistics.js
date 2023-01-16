import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Axios from "axios";
import decoder from "jwt-decode";
import "../css/Statistics.css"
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";

import { Bar } from "react-chartjs-2";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
ChartJS.register(
  ArcElement,
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
      text: "Meter Price Analytics",
    },
  },
};

function Statistics() {

  const navigate = useNavigate();
  useEffect(() => {
    getAllMeterReadings();
    getBillStatistics();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  let cred = localStorage.getItem("jwt");
  const email = decoder(cred).sub;
  console.log("email", email.sub);
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
      })
      .catch((error) => {
        if (error.response) {
          console.log("inside error");
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          alert(error.response.data);
          if (error.response.data === "JWT Expired") {
            localStorage.clear();
            navigate("/");
          }
        } else {
          console.log("Error", error.message);
        }
      });
  };

  const getBillStatistics = async () => {
    //Prevent page reload
    const labelSet = [];
    const dataSet1 = [];
    const dataSet2 = [];
    const dataSet3 = [];
    const dataSet4 = [];
    console.log("in get all meter readings");
    await Axios.get(window.API_URL+"/admin/billStatistics", {
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
          dataSet1.push(val.e_meter_reading_day);
          dataSet2.push(val.e_meter_reading_night);
          dataSet3.push(val.g_meter_reading);
          dataSet4.push(val.amount);
          labelSet.push(val.bill_date);
        }
        setData1({
          labels: labelSet,
          datasets: [
            {
              label: "Electric Price day",
              data: dataSet1,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(99, 132, 0.5)",
            },
            {
              label: "Electric Price night",
              data: dataSet2,
              borderColor: "rgb(553, 235, 0.5)",
              backgroundColor: "rgba(53, 235, 0.5)",
            },
            {
              label: "Gas Price",
              data: dataSet3,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgb(255, 99, 132)",
            },
            {
              label: "Bill Amount",
              data: dataSet4,
              borderColor: "rgb(0, 0, 0)",
              backgroundColor: "rgb(0, 0, 0)",
            },
          ],
        });
        console.log("arrData", dataSet1, dataSet2);
      })
      .catch((error) => {
        if (error.response) {
          console.log("inside error");
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          if (error.response.data === "JWT Expired") {
            localStorage.clear();
            navigate("/")
          }
          alert(error.response.data);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  const [data1, setData1] = useState({
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


  const options1 = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Bill Statistic",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand
            href="/adminDashboard"
            style={{ fontSize: "2.5rem", color: "gold" }}
          >
            iGSE
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="/adminDashboard"
                style={{ fontSize: "1.5rem", color: "white" }}
              >
                Home
              </Nav.Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text style={{ fontSize: "1.5rem", color: "brown" }}>
                Signed in as:{" "}
                <a style={{ color: "white" }} onClick={logout}>
                  {email}
                </a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid id="statisticContainer" className="mt-3">
        <Row>
          <Col lg={6}>
            <Line id="line" data={data} options={options}  />
          </Col>
          <Col lg={6} id="barCol">
            {/* <Doughnut data={data1} /> */}
            <Bar options={options1} data={data1}  id="bar" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Statistics;
