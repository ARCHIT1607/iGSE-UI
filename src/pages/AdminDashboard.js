import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { Outlet } from "react-router-dom";
import "../css/AdminDashboard.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import MeterPrice from "./MeterPrice";
import MeterReadings from "./MeterReadings";
import Analytics from "./Analytics";
function AdminDashboard() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#adminDashboardContainer">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#adminDashboardContainer">Home</Nav.Link>
              <Nav.Link href="#meterPriceCard">PriceSet</Nav.Link>
              <Nav.Link href="#meterReadingsContainer">Meter Reading</Nav.Link>
              <Nav.Link href="#analyticRow">Analytics</Nav.Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: <a href="#login">Mark Otto</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid id="adminDashboardContainer">
        <Row>
          <Col>
            <Card border="primary" >
              <Card.Body>
                <Card.Title>Users</Card.Title>
                <Card.Text>10</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Meter Readings</Card.Title>
                <Card.Text>10</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Bills</Card.Title>
                <Card.Text>10</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={4} id="setPrice" >
           <MeterPrice></MeterPrice>
          </Col>
          <Col lg={8}  style={{height:"10px!important"}}>
            <Analytics></Analytics>
          </Col>
        </Row>
        <Row>
          <MeterReadings></MeterReadings>
        </Row>
      </Container>
    </>
  );
}

export default AdminDashboard;
