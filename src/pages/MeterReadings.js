import React from "react";
import "../css/MeterReadings.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";
function MeterReadings() {
  return (
    <>
      <Container id="meterReadingsContainer" className="mt-5">
        
        <Card>
        <Table hover responsive borderless>
          <thead>
            <tr>
              <th>Email Id</th>
              <th>Electricity(D)</th>
              <th>Electricity(N)</th>
              <th>Gas</th>
              <th>Submission Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>test@gmail.com</td>
              <td>100</td>
              <td>200</td>
              <td>300</td>
              <td>2022-04-01</td>
            </tr>
            <tr>
              <td>2022-04-01</td>
              <td>100</td>
              <td>200</td>
              <td>300</td>
              <td>45.5</td>
            </tr>
            <tr>
              <td>2022-04-01</td>
              <td>100</td>
              <td>200</td>
              <td>300</td>
              <td>45.5</td>
            </tr>
          </tbody>
        </Table>
        </Card>
      </Container>
    </>
  );
}

export default MeterReadings;
