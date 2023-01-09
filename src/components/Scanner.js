import React from 'react'
import QrReader from "react-qr-reader";
function Scanner({webcamScan,webcamError}) {
  return (
    <QrReader
delay={300}
onError={webcamError}
onScan={webcamScan}
legacyMode={false}
facingMode={"environment"}
/>
  )
}

export default Scanner