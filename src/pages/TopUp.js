import React, { useState } from "react";
import "../css/TopUp.css";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
function TopUp() {
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
              <Button className="me-4" variant="primary" type="submit">
                Credit
              </Button>
              <Button variant="primary" type="submit">
                upload Qr code
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}

export default TopUp;
