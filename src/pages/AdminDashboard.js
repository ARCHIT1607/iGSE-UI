import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { Outlet, useNavigate } from "react-router-dom";
import "../css/AdminDashboard.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import MeterPrice from "./MeterPrice";
import Analytics from "./Analytics";
import Axios from "axios";
import decoder from "jwt-decode";
import Bills from "./Bills";
function AdminDashboard() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState([]);
  let cred = localStorage.getItem("jwt");

  const email = decoder(cred).sub;
  console.log("email", email.sub);
  const getAllCounts = async () => {
    //Prevent page reload
    console.log("in get all counts ");
    await Axios.get(window.API_URL+"admin/getAllCounts", {
      headers: {
        Authorization: "Bearer " + cred,
      },
    })
      .then((response) => {
        console.log(response.data);
        console.log("all counts");
        setCounts(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log("inside error");
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          alert(error.response.data);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    getAllCounts();
  }, []);

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand
            href="#adminDashboardContainer"
            style={{ fontSize: "2.5rem", color: "gold" }}
          >
            iGSE
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="#adminDashboardContainer"
                style={{ fontSize: "1.5rem", color: "white" }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="#meterPriceCard"
                style={{ fontSize: "1.5rem", color: "white" }}
              >
                PriceSet
              </Nav.Link>
              <Nav.Link
                href="/statistics"
                style={{ fontSize: "1.5rem", color: "white" }}
              >
                Analytics
              </Nav.Link>
              <Nav.Link
                href="#meterReadingsContainer"
                style={{ fontSize: "1.5rem", color: "white" }}
              >
                Bills
              </Nav.Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text style={{ fontSize: "1.5rem", color: "brown" }}>
                Signed in as: <a style={{color:"white"}} onClick={logout}>{email}</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid id="adminDashboardContainer" className="mt-5">
        <Row>
          <Col>
            <Card border="primary">
              <Card.Body>
                <Card.Title id="userCardTitle">Users</Card.Title>
                <Card.Text id="userCardText">{counts.userCount}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card border="primary">
              <Card.Body>
                <Card.Title id="meterReadingCardTitle">Meter Readings</Card.Title>
                <Card.Text id="meterReadingCardText">{counts.meterReadingCount}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card border="primary">
              <Card.Body>
                <Card.Title id="billCardTitle">Bills</Card.Title>
                <Card.Text id="billCardText">{counts.billCount}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={4} id="setPrice">
            <MeterPrice></MeterPrice>
          </Col>
          <Col lg={8} style={{ height: "10px!important" }}>
            <Analytics></Analytics>
          </Col>
        </Row>
        <Row>
          <Bills></Bills>
        </Row>
      </Container>
    </>
  );
}

export default AdminDashboard;
