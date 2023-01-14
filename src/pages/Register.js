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
import Axios from "axios";
import "../css/Register.css";

function Register() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const fileRef = useRef();

  const [customer, setCustomer] = useState([]);
  const [propertyType, setPropertyType] = useState(0);
  const [address, setAddress] = useState("");
  const [bedrooms, setBedrooms] = useState(0);
  const [evc, setEVC] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log("inside submit")
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
     handleRegister(event);
    }
    setValidated(true);
  };

  const handleRegister = async (e) => {
    //Prevent page reload
    console.log("in register");
    const customer = {
      email,
      password,
      propertyType,
      address,
      bedrooms,
    };
    e.preventDefault();
    await Axios.post("http://localhost:8080/auth/register/" + evc, customer)
      .then((response) => {
        console.log(response.data);
        console.log("inside success");
        navigate("/");
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
                  style={{ width: "34rem" }}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
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
                  style={{ width: "34rem" }}
                  // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
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
            <Col xs="12">
              <FloatingLabel
                controlId="floatingTextarea"
                label="Comments"
                className="mb-3"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: '100px' }}
                />
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
                  onChange={(e) => {
                    setPropertyType(e.target.value);
                  }}
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
                  onChange={(e) => {
                    setBedrooms(e.target.value);
                  }}
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
                  type="text"
                  onChange={(e) => {
                    setEVC(e.target.value);
                  }}
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
