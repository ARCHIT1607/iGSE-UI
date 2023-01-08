import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from 'react-bootstrap/Stack'
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import "../css/UserMeterReading.css"

function UserMeterReading() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <>
      <Container id="userMeterReadingContainer" >
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h2 className="mb-3 ">Meter Reading..</h2>
            <Stack gap={4}>
            <Col md>
              <FloatingLabel
                controlId="floatingInputGrid"
                label="Submission date (e.g. 2022-11-05, default value: today)"
              >
                <Form.Control
                  type="date"
                  required
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  date is not correct
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Electricity meter reading - Day (e.g. 100 kWh)">
                <Form.Control
                  required
                  type="number"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  password criteria not met yet!!
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel
                controlId="floatingInputGrid"
                label="Electricity meter reading - Night (e.g. 200 kWh)"
              >
                <Form.Control
                  type="number"
                  required
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  date is not correct
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Gas meter reading (e.g. 800 kWh 1 )">
                <Form.Control
                  required
                  type="number"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  password criteria not met yet!!
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            </Stack>
          <Button className="mt-4" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default UserMeterReading;
