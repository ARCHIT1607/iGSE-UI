import React, { useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import { useNavigate } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import QrScanner from "qr-scanner";
import "../css/Register.css";

function Register() {
  const [validated, setValidated] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [evc, setEVC] = useState("");
  const fileRef = useRef();
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      navigate("userDashboard");
    }
    setValidated(true);
  };

  const handleTopUp = async () => {
    //Prevent page reload
    // await Axios.post("http://localhost:8080/customer/topUp?EVC=" + evc, null, {
    //   headers: {
    //     Authorization: "Basic " + cred,
    //   },
    // })
    //   .then((response) => {
    //     console.log(response.data);
    //     console.log("Top up successfully");
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       console.log("inside error");
    //       console.log(error.response.data);
    //       console.log(error.response.status);
    //       console.log(error.response.headers);
    //       alert(error.response.data);
    //     } else {
    //       console.log("Error", error.message);
    //     }
    //   });
    console.log("top up");
  };

  const handleClick = () => {
    fileRef.current.click();
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    const result = await QrScanner.scanImage(file);
    setEVC(result);
  };

  return (
    <>
      <Container id="RegisterContainer">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h2 className="mb-5 ">Register</h2>
          {/* First Row */}
          <Row className="g-2 mb-3">
            <Col md>
              <FloatingLabel
                controlId="floatingInputGrid"
                label="Email address"
              >
                <Form.Control
                  type="email"
                  required
                  placeholder="name@example.com"
                  style={{ width: "30rem" }}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  email is not correct
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  style={{ width: "30rem" }}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  password criteria not met yet!!
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Row>
          {/* Second Row */}
          <Row className="mb-3">
            <Col xs="auto">
              <FloatingLabel
                controlId="floatingInputGrid"
                label="Flat No / Bld name"
              >
                <Form.Control
                  required
                  type="text"
                  placeholder="Flat No & Bld Name"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  not valid
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col xs="auto">
              <FloatingLabel controlId="floatingInputGrid" label="Street Name">
                <Form.Control required type="text" placeholder="Street Name" />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  invalid input
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col xs="auto">
              <FloatingLabel controlId="floatingInputGrid" label="City">
                <Form.Control required type="text" placeholder="City" />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  invalid input
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col xs="auto">
              <FloatingLabel controlId="floatingInputGrid" label="Postcode">
                <Form.Control required type="text" placeholder="Postcode" />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  invalid Postcode
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Row>
          {/* Third Row  */}
          <Row className="g-3 mb-3">
            <Col md>
              <FloatingLabel controlId="floatingSelect" label="Property type">
                <Form.Select
                  aria-label="Floating label select example"
                  style={{ width: "20rem" }}
                  required
                >
                  <option value="detached">detached</option>
                  <option value="semi-detached">semi-detached</option>
                  <option value="terraced">terraced</option>
                  <option value="flat">flat</option>
                  <option value="cottage">cottage</option>
                  <option value="bungalow and mansion">
                    bungalow and mansion
                  </option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel
                controlId="floatingInputGrid"
                label="Number of bedrooms"
              >
                <Form.Control
                  required
                  type="number"
                  min={0}
                  placeholder="Number of bedrooms"
                  style={{ width: "20rem" }}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  invalid number
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col md>
              {/* <FloatingLabel
                controlId="floatingInputGrid"
                label="Energy voucher code (EVC)"
              >
                <Form.Control
                  required
                  type="text"
                  placeholder="Energy voucher code (EVC)"
                  style={{ width: "20rem" }}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  invalid number
                </Form.Control.Feedback>
              </FloatingLabel> */}
              <InputGroup>
                <Form.Control
                  placeholder="Energy voucher code (EVC)"
                  aria-label="Energy voucher code (EVC)"
                  style={{ height: "3.6rem" }}
                  value={evc}
                />
                <Button
                  variant="primary"
                  onClick={() => {
                    handleTopUp();
                  }}
                >
                  Button
                </Button>
                <Button variant="primary" onClick={handleClick}>
                  Upload Qr Code
                </Button>
                <input
                            type="file"
                            ref={fileRef}
                            onChange={handleChange}
                            accept=".png, .jpg, .jpeg"
                            style={{ display: "none" }}
                          />
              </InputGroup>
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Register;
