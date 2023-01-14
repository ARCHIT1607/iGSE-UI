import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Card from "react-bootstrap/Card";

import "../css/MeterPrice.css";
function MeterPrice() {
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
      <Card border="primary" id="meterPriceCard">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h2>Setting Price</h2>
        <FloatingLabel
          controlId="floatingInput"
          label="Electricity Day"
          className="mb-3"
        >
          <Form.Control
            required
            type="number"
            placeholder="Electricity Day"
            autoComplete="off"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            email is not correct
          </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Electricity Night">
          <Form.Control
            className="mb-3"
            required
            type="number"
            placeholder="Electricity Night"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            password criteria not met yet!!
          </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Gas">
          <Form.Control
            className="mb-3"
            required
            type="number"
            placeholder="Gas"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            password criteria not met yet!!
          </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Standing">
          <Form.Control
            className="mb-3"
            required
            type="number"
            placeholder="Standing"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            password criteria not met yet!!
          </Form.Control.Feedback>
        </FloatingLabel>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </Card>
    </>
  );
}

export default MeterPrice;
