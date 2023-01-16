import React, { useEffect, useRef, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useNavigate } from "react-router-dom";
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
    await Axios.get(window.API_URL + "/admin/getAllCounts", {
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
          if (error.response.data === "JWT Expired") {
            localStorage.clear();
            navigate("/")
          }else{
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
  const [file, setFile] = useState(null);
  const [evc, setEVC] = useState("");
  const fileRef = useRef();

  const handleClick = () => {
    fileRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    let fileName = e.target.files[0].name;
    setFile(file);
    setEVC(fileName.split(".")[0]);
    console.log("evc",evc);
    handleUpload(e);
    e.target.value = null;
  };
  var bodyFormData = new FormData();
  const handleUpload = async () => {
    bodyFormData.append("evc",evc);
    bodyFormData.append("image",file);
    await Axios.post(window.API_URL + "/qr/upload/image",
    bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    })
      .then((response) => {
        console.log(response.data);
        console.log("image upload successfully");
        setFile(null)
      })
      .catch((error) => {
        if (error.response) {
          console.log("inside error");
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          if (error.response.data.errorMsg === "JWT Expired") {
            localStorage.clear();
            navigate("/")
          }
          else{
            alert(error.response.data.errorMsg);
            }
        } else {
          console.log("Error", error.message);
        }
      });
  };

  useEffect(() => {
    getAllCounts();
  }, []);

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
                href="#adminDashboardContainer"
                style={{ fontSize: "1.5rem", color: "white" }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="/statistics"
                style={{ fontSize: "1.5rem", color: "white" }}
              >
                Analytics
              </Nav.Link>
              <Nav.Link
                onClick={handleClick}
                style={{ fontSize: "1.5rem", color: "white" }}
              >
                UploadQr
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
      <Container fluid id="adminDashboardContainer" className="mt-5">
        <Row>
        <input
                type="file"
                ref={fileRef}
                onChange={handleChange}
                accept=".png, .jpg, .jpeg"
                style={{ display: "none" }}
              />
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
                <Card.Title id="meterReadingCardTitle">
                  Meter Readings
                </Card.Title>
                <Card.Text id="meterReadingCardText">
                  {counts.meterReadingCount}
                </Card.Text>
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
