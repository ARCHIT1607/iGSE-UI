import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import "../css/Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function Login() {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      login(event);
    }
    setValidated(true);
  };

  const login = async (e) => {
    console.log("in login");
    e.preventDefault();
    await Axios.post(
      "http://localhost:8080/auth/login?email=" +
        email +
        "&password=" +
        password
    )
      .then((response) => {
        console.log(response.data.token);
        console.log("inside success");
        console.log("email in login " + email);

        localStorage.setItem("jwt", response.data.token);
        // console.log("jwt ", jwt_decode(response.data));
        navigate("/userDashboard");
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

  useEffect(() => {
    if(localStorage.getItem("jwt")!=null){
      navigate("/userDashboard");
    }
  }, [])
  

  return (
    <>
      <Container id="loginContainer">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              required
              type="email"
              placeholder="Email"
              autoComplete="off"
              style={{ width: "400px" }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              email is not correct
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              className="mb-3"
              required
              type="password"
              placeholder="Password"
              style={{ width: "400px" }}
              pattern="^(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]$"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
      </Container>
    </>
  );
}

export default Login;
