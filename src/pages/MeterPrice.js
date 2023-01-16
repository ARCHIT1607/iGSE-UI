import Axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Card from "react-bootstrap/Card";

import "../css/MeterPrice.css";
import { useNavigate } from "react-router-dom";

function MeterPrice() {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const [eMeterPriceDay, setEMeterPriceDay] = useState();
  const [eMeterPriceNight, setEMeterPriceNight] = useState();
  const [gMeterPrice, setGMeterPrice] = useState();
  const [standingPrice, setStandingPrice] = useState();

  let cred = localStorage.getItem("jwt");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      submitMeterPrice();
    }
    setValidated(true);
  };

  const submitMeterPrice = async () => {
    //Prevent page reload
    console.log("in price set");
    const meter = {
      eMeterPriceDay,
      eMeterPriceNight,
      gMeterPrice,
      standingPrice,
    };
    await Axios.post(window.API_URL + "/admin/setMeterPrice", meter, {
      headers: {
        Authorization: "Bearer " + cred,
      },
    })
      .then((response) => {
        console.log(response.data);
        console.log("submitted meter price successfully");
        window.location.reload(false);
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
          alert(error.response.data);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  useEffect(() => {
    if (localStorage.getItem("jwt") == null) {
      navigate("/");
    }
  }, []);

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
              step=".01"
              size="lg"
              style={{ height: "4.5rem" }}
              value={eMeterPriceDay}
              onChange={(e) => {
                setEMeterPriceDay(e.target.value);
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              price cannot be empty
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Electricity Night">
            <Form.Control
              className="mb-3"
              required
              type="number"
              placeholder="Electricity Night"
              value={eMeterPriceNight}
              step=".01"
              size="lg"
              style={{ height: "4.5rem" }}
              onChange={(e) => {
                setEMeterPriceNight(e.target.value);
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              price cannot be empty
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Gas">
            <Form.Control
              className="mb-3"
              required
              type="number"
              placeholder="Gas"
              value={gMeterPrice}
              step=".01"
              size="lg"
              style={{ height: "4.5rem" }}
              onChange={(e) => {
                setGMeterPrice(e.target.value);
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              price cannot be empty
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Standing">
            <Form.Control
              className="mb-3"
              required
              type="number"
              placeholder="Standing"
              value={standingPrice}
              step=".01"
              size="lg"
              style={{ height: "4.5rem" }}
              onChange={(e) => {
                setStandingPrice(e.target.value);
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              price cannot be empty
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
