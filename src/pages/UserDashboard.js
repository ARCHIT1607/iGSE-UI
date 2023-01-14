import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import { Outlet, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "../css/UserDashboard.css";
function UserDashboard() {
  const navigate = useNavigate();

  const openMeterReadingDialogue = () => {
    console.log("submit meter reading clicked");
    navigate("meterReading");
  };

  const openViewDialogue = () => {
    console.log("submit meter reading clicked");
    navigate("userReading");
  };

  const openTopUpDialogue = () => {
    console.log("submit meter reading clicked");
    navigate("topUp");
  };

  var token = localStorage.getItem("jwt");
  var decoded = jwt_decode(token);
  let isCustomer = decoded.sub!== "gse@shangrila.gov.un";

  useEffect(() => {
    console.log("isCustomer ", isCustomer);
    if (!isCustomer) {
      navigate("/adminDashboard");
    }
  }, []);

  return (
    <>
      <Container id="userDashboardContainer" className="mt-3">
        <Row>
          <Col>
            <Button variant="light" onClick={openMeterReadingDialogue}>
              <Card id="userDashboardCard" bg="primary" text="light" style={{ height: "15rem" }}>
                <Card.Body>
                  <Card.Title id="userCardTitle">Submit New Meter Reading</Card.Title>
                  <Card.Text id="userCardText" className="pt-3">
                    A customer can submit new meter readings
                  </Card.Text>
                </Card.Body>
              </Card>
            </Button>
          </Col>

          <Col>
          <Button variant="light" onClick={openViewDialogue}>
            <Card bg="success" text="light" style={{ height: "10rem" }}>
              <Card.Body>
                <Card.Title>View & Pay Bill</Card.Title>
                <Card.Text className="pt-3">
                  A customer can view and pay the latest unpaid bill with energy
                  credit*.
                </Card.Text>
              </Card.Body>
            </Card>
            </Button>
          </Col>

          <Col>
          <Button variant="light" onClick={openTopUpDialogue}>
            <Card bg="secondary" text="light" style={{ height: "10rem" }} id="topUpCard">
              <Card.Body>
                <Card.Title>Top Up</Card.Title>
                <Card.Text className="pt-3">
                  A customer can top up the credit with a valid EVC*.
                </Card.Text>
              </Card.Body>
            </Card>
            </Button>
          </Col>
        </Row>
        <Row className="p-4">
          <Outlet></Outlet>
        </Row>
      </Container>
    </>
  );
}

export default UserDashboard;
