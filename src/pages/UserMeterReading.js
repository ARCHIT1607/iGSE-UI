import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/UserMeterReading.css";

function UserMeterReading() {
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();
  const [submissionDate, setSubmissionDate] = useState("");
  const [eMeterReadingDay, setEMeterReadingDay] = useState(0);
  const [eMeterReadingNight, setEMeterReadingNight] = useState(0);
  const [gMeterReading, setGMeterReading] = useState(0);
  let cred = localStorage.getItem("jwt");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      handleSubmitMeterReading(event);
    }
    setValidated(true);
  };

  const handleSubmitMeterReading = async (e) => {
    //Prevent page reload
    console.log("in submit");
    const meterReading = {
      submissionDate,
      eMeterReadingDay,
      eMeterReadingNight,
      gMeterReading,
    };
    e.preventDefault();
    await Axios.post(
      window.API_URL + "/customer/submitMeterReading",
      meterReading,
      {
        headers: {
          Authorization: "Bearer " + cred,
        },
      }
    )
      .then((response) => {
        console.log(response.data);
        console.log("submitted meter reading successfully");
        alert(response.data);
        window.location.reload(false)
      })
      .catch((error) => {
        if (error.response) {
          console.log("inside error");
          console.log(error.response.data);
          console.log(error.response.status);
          if (error.response.data.errorType == "month_submitted_found") {
            setSubDateErrorMsg(error.response.data.errorMsg);
            setSubDateError("block");
          } else if (
            error.response.data.errorType == "meter_reading_less_than_previous"
          ) {
            setReadingErrorMsg(error.response.data.errorMsg);
            setReadingError("block");
          } else {
            alert(error.response.data.errorMsg);
          }
          if (error.response.data === "JWT Expired") {
            localStorage.clear();
            navigate("/");
          }
        } else {
          console.log("Error", error.message);
        }
      });
  };

  useEffect(() => {
    if (localStorage.getItem("jwt") == null) {
      navigate("/");
    }
  });

  const [subDateError, setSubDateError] = useState("none");
  const [subDateErrorMsg, setSubDateErrorMsg] = useState("");

  const [readingError, setReadingError] = useState("none");
  const [readingErrorMsg, setReadingErrorMsg] = useState("");

  return (
    <>
      <Container id="userMeterReadingContainer">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h2 className="mb-3 ">Meter Reading</h2>
          <Stack gap={4}>
            <Col md>
              <FloatingLabel
                controlId="floatingInputGrid"
                label="Submission date"
              >
                <Form.Control
                  type="date"
                  required
                  size="lg"
                  onChange={(e) => {
                    setSubmissionDate(e.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid" style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    display: subDateError,
                  }}
                >
                  {subDateErrorMsg}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel
                controlId="floatingInputGrid"
                label="Electricity meter reading Day- (kWh)"
              >
                <Form.Control
                  required
                  type="number"
                  size="lg"
                  min={0}
                  onChange={(e) => {
                    setEMeterReadingDay(e.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid"style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    display: readingError,
                  }}
                >
                  {readingErrorMsg}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel
                controlId="floatingInputGrid"
                label="Electricity meter reading Night- (kWh)"
              >
                <Form.Control
                  type="number"
                  required
                  size="lg"
                  min={0}
                  onChange={(e) => {
                    setEMeterReadingNight(e.target.value);
                  }}
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    display: readingError,
                  }}
                >
                  {readingErrorMsg}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel
                controlId="floatingInputGrid"
                label="Gas meter reading- kWh"
              >
                <Form.Control
                  required
                  type="number"
                  size="lg"
                  min={0}
                  onChange={(e) => {
                    setGMeterReading(e.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid" style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    display: readingError,
                  }}
                >
                  {readingErrorMsg}
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
