import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import "../css/Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";

function Login() {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log("form ",form)
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
      window.API_URL+"/auth/login?email=" +
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
          console.log(error.response);
          if(error.response.data.errorType=="password_not_found"){
            setPwdErrorMsg(error.response.data.errorMsg);
            setPwdError("block");
          }else if(error.response.data.errorType=="user_not_found"){
            setEmailErrorrMsg(error.response.data.errorMsg);
            setEmailError("block");
          }
        } else {
          console.log("Error", error.message);
        }
      });
  };

  const [pwdError, setPwdError] = useState("none")
  const [pwdErrorMsg, setPwdErrorMsg] = useState("")

  const [emailError, setEmailError] = useState("none")
  const [emailErrorMsg, setEmailErrorrMsg] = useState("")
  
  const onPwdChange=(e)=>{
    if(e.target.id=="pwdInput"){
      console.log("length ",e.target.value.length)
      if(e.target.value.length==0){
        setPwdError("block")
        setPwdErrorMsg("password cannot be empty")
      }else if(e.target.value.length<=6){
        setPwdError("block")
        setPwdErrorMsg("password must be between 6 and 10 character")
        console.log("pwdError",pwdError)
      }
      else{
        setPwdError("")
        setPassword(e.target.value)
      }
    }
  }

  useEffect(() => {
    var token = localStorage.getItem("jwt");

    if (token != null) {
      var decoded = jwt_decode(token);
      let isCustomer = decoded.sub !== "gse@shangrila.gov.un";
      if(!isCustomer){
        navigate("/adminDashboard");
      }
      else{
        navigate("/userDashboard");
      }
    }
  }, []);

  return (
    <>
      <Container fluid id="loginContainer">
        <ToastContainer></ToastContainer>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h1 style={{ color: "white", fontWeight: "bold" }} className="mb-5">
            Login
          </h1>
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
              size="lg"
              style={{ width: "500px", height:"4rem"}}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Form.Control.Feedback
              type="invalid"
              className="text-end"
              style={{ color: "red", fontWeight: "bold",fontSize:"1rem",display:emailError }}
            >
              {emailErrorMsg}
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              className="mb-3"
              required
              type="password"
              size="lg"
              id="pwdInput"
              minLength={6}
              maxLength={12}
              placeholder="Password"
              style={{ width: "500px", height:"4rem"}}
              onChange={
                onPwdChange
              }
            />
            <Form.Control.Feedback
              type="invalid"
              className="text-end"
              style={{ color: "red", fontWeight: "bold",fontSize:"1rem",display:pwdError }}
            >
              {pwdErrorMsg}
            </Form.Control.Feedback>
          </FloatingLabel>
          <p  className="text-end" style={{ fontSize: "1rem", color: "white" }}>
            New to iGSE? <a style={{color:"black",fontWeight:"bolder"}} href="/register">Register from here!!</a>
          </p>
          <Button variant="primary" type="submit" size="lg" className="mt-3">
            Login
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Login;
