import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import QrReader from "react-qr-reader";
import Scanner from '../components/Scanner';
function Test() {
    const [webcamResult, setWebcamResult] = useState();

    const [component, setComponent] = useState();

    const addComponent = () =>{
        setComponent(<Scanner webcamError={webcamError} webcamScan={webcamScan}></Scanner>)
    }
    
    const webcamError = (error) => {
      if (error) {
        console.log(error);
      }
    };
    const webcamScan = (result) => {
        // console.log("op ",result)
      if (result) {
        setWebcamResult(result);
        setComponent();
      }
    };
    return (
      <div className="card col-sm-4">
        <div className="card-header m-1 rounded text-center">
          <h3>Webcam Image</h3>
        </div>
        <div className="card-body text-center">
        {component}
        </div>
        <div className="card-footer rounded mb-1">
          <h6>WebCam Result: {webcamResult}</h6>
          <Button onClick={addComponent}>Qr Scanner</Button>
        </div>
      </div>
    );
}

export default Test