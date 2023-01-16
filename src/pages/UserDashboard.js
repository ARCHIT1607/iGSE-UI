import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import { Outlet, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Axios from "axios";
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
  let isCustomer = decoded.sub !== "gse@shangrila.gov.un";
  const [balance, setBalance] = useState(0);
  let cred = localStorage.getItem("jwt");

  const getBalance = async () => {
    //Prevent page reload
    console.log("get Balance");
    await Axios.get(window.API_URL+"/customer/getBalance", {
      headers: {
        Authorization: "Bearer " + cred,
      },
    })
      .then((response) => {
        setBalance(response.data);
        console.log("balance inside success", balance);
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
          else{
            alert(error.response.data);
          }
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
    console.log("isCustomer ", isCustomer);
    if (!isCustomer) {
      navigate("/adminDashboard");
    } else {
      getBalance();
    }
  }, []);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/userDashboard" style={{ fontSize: "2.5rem", color: "gold" }}>iGSE</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Navbar.Text
                  style={{ fontSize: "1.2rem", color: "brown" }}
                  className="me-3"
                >
                  Signed in as:{" "}
                  <a  style={{ color: "white" }} onClick={logout}>
                    {decoded.sub}
                  </a>
                </Navbar.Text>
                <Navbar.Text style={{ fontSize: "1.2rem", color: "lightBlue" }}>
                  Balance : {balance.toFixed(2)} &#163;
                </Navbar.Text>
              </Nav>
            </Navbar.Collapse>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid id="userDashboardContainer">
        <Row className="pt-5">
          <Col >
            <Button variant="light" onClick={openMeterReadingDialogue} className="mb-3">
              <Card
                id="submitMeterReadingCard"
                bg="primary"
                text="light"
                style={{ height: "11rem"}}
              >
                <Card.Body>
                  <Card.Title id="userCardTitle">
                    Submit New Meter Reading
                  </Card.Title>
                  <Card.Text id="userCardText" className="pt-3">
                    A customer can submit new meter readings
                  </Card.Text>
                </Card.Body>
              </Card>
            </Button>
          </Col>

          <Col>
            <Button variant="light" onClick={openViewDialogue}>
              <Card
                bg="success"
                id="paybillCard"
                text="light"
                style={{ height: "11rem" }}
              >
                <Card.Body>
                  <Card.Title id="payBillCardTitle">View & Pay Bill</Card.Title>
                  <Card.Text className="pt-3" id="payBillCardText">
                    A customer can view and pay the latest unpaid bill with
                    energy credit*.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Button>
          </Col>

          <Col>
            <Button variant="light" onClick={openTopUpDialogue}>
              <Card
                bg="secondary"
                text="light"
                style={{ height: "11rem" }}
                id="topUpCard"
              >
                <Card.Body>
                  <Card.Title id="topUpCardTitle">Top Up</Card.Title>
                  <Card.Text className="pt-3" id="topUpCardText">
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
