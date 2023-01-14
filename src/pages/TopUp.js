import React, { useRef, useState } from "react";
import "../css/TopUp.css";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import QrScanner from "qr-scanner";
import Axios from "axios";
import Scanner from "../components/Scanner";
function TopUp() {
  const [validated, setValidated] = useState(false);
  const [file, setFile] = useState(null);
  const fileRef = useRef();
  const [evc, setEVC] = useState("");
  let cred = localStorage.getItem("jwt");
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const [component, setComponent] = useState();

  const addComponent = () => {
    if(component==null){
      setComponent(
        <Scanner webcamError={webcamError} webcamScan={webcamScan}></Scanner>
      );
    }else{
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

  const handleTopUp = async () => {
    // Prevent page reload
    await Axios.post("http://localhost:8080/customer/topUp?EVC=" + evc, null, {
      headers: {
        Authorization: "Bearer " + cred,
      },
    })
      .then((response) => {
        console.log(response.data);
        console.log("Top up successfully");
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
      <Container id="topUpContainer" className="mt-3">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h2 className="mb-3">Top Up</h2>
          <Row className="mb-3">
            <Col md>
              <FloatingLabel
                controlId="floatingInputGrid"
                label="Energy voucher code (EVC)"
              >
                <Form.Control
                  required
                  type="text"
                  placeholder="Energy voucher code (EVC)"
                  style={{ width: "20rem" }}
                  value={evc}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  invalid number
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col >
              <Button variant="primary" onClick={addComponent} className="me-3">
                Scan
              </Button>
              <Button variant="primary" onClick={handleClick} className="me-3">
                Upload
              </Button>
              <Button variant="primary" onClick={handleTopUp} className="me-3">
                TopUp
              </Button>
              <input
                type="file"
                ref={fileRef}
                onChange={handleChange}
                accept=".png, .jpg, .jpeg"
                style={{ display: "none" }}
              />
            </Col>
          </Row>
          <Row>
          <div className="card-body text-center mt-3">{component}</div>
          </Row>
        </Form>
        
      </Container>
    </>
  );
}

export default TopUp;
