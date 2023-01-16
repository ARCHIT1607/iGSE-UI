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
import Scanner from "../components/Scanner";
import "../css/Register.css";

function Register() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const fileRef = useRef();

  const [propertyType, setPropertyType] = useState();
  const [address, setAddress] = useState("");
  const [bedrooms, setBedrooms] = useState();
  const [evc, setEVC] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
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
    await Axios.post(window.API_URL+"/auth/register/" + evc, customer)
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

  const handleClick = () => {
    fileRef.current.click();
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    const result = await QrScanner.scanImage(file);
    setEVC(result);
  };

  const [component, setComponent] = useState();

  const addComponent = () => {
    if (component == null) {
      console.log("inside component");
      setComponent(
        <Scanner webcamError={webcamError} webcamScan={webcamScan}></Scanner>
      );
    } else {
      setComponent();
    }
  };

  const webcamError = (error) => {
    if (error) {
      console.log(error);
    }
  };
  const webcamScan = (result) => {
    // console.log("op ",result)
    if (result) {
      setEVC(result);
      setComponent();
    }
  };
const [pwdError, setPwdError] = useState("")

  const onPwdChange=(e)=>{
    if(e.target.id=="pwdInput"){
      if(e.target.value.length==0){
        setPwdError("password cannot be empty")
      }else if(e.target.value.length<=6){
        setPwdError("password must be between 6 and 10 character")
      }
      else{
        setPwdError("")
        setPassword(e.target.value)
      }
    }
  }

  return (
    <>
      <Container id="RegisterContainer">
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          id="registerForm"
        >
          <h2 className="mb-5 ">Register</h2>
          {/* First Row */}
          <Row className="g-2 mb-3">
            <Col md>
              <FloatingLabel controlId="floatingInput" label="Email address">
                <Form.Control
                  type="email"
                  required
                  placeholder="name@example.com"
                  size="lg"
                  id="emailInput"
                  onChange={(e)=>{
                    setEmail(e.target.value)}}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  email format incorrect
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  id="pwdInput"
                  minLength={6}
                  maxLength={10}
                  size="lg"
                  onChange={
                    onPwdChange
                  }
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                {pwdError!=""?pwdError:"password cannot be empty"}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Row>
          {/* Second Row */}
          <Row className="g-2 mb-3">
            <Col md>
              <FloatingLabel
              required
                controlId="floatingTextarea"
                label="Address"
                className="mb-3"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  id="addressInput"
                  size="lg"
                  required
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                address cannot be empty
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingSelect" label="Property type">
                <Form.Select
                  aria-label="Floating label select example"
                  id="propertyInput"
                  required
                  size="md"
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
          </Row>
          {/* Third Row  */}
          <Row className="g-2 mb-3">
            <Col md>
              <FloatingLabel
                controlId="floatingInputGrid"
                label="Number of bedrooms"
              >
                <Form.Control
                  required
                  type="number"
                  min={0}
                  size="lg"
                  placeholder="Number of bedrooms"
                  id="bedroomInput"
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
              <InputGroup>
                <Form.Control
                  required
                  placeholder="Energy voucher code (EVC)"
                  aria-label="Energy voucher code (EVC)"
                  type="text"
                  size="lg"
                  onChange={(e) => {
                    setEVC(e.target.value);
                  }}
                  id="evcInput"
                  value={evc}
                />
                <Button variant="success" onClick={addComponent}>
                  Scan
                </Button>
                <Button variant="primary" onClick={handleClick}>
                  Upload
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
            <p className="text-end fs-6">Already have an account? <a href="/">Login</a> </p>
          </Row>
          <Button variant="primary" type="submit" size="lg">
            Register
          </Button>
          <Row>
            <div id="qrDiv" className="card-body text-center mt-3">
              {component}
            </div>
          </Row>
        </Form>
      </Container>
    </>
  );
}

export default Register;
