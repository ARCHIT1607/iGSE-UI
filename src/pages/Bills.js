import React, { useEffect, useState } from "react";
import "../css/Bills.css";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";
import Axios from "axios";
function Bills() {
  useEffect(() => {
    getAllBills();
  }, []);

  let cred = localStorage.getItem("jwt");

  const [bills, setBills] = useState([]);

  const getAllBills = async () => {
    //Prevent page reload
    console.log("in getAllBills");
    await Axios.get("http://localhost:8080/admin/getAllBills", {
      headers: {
        Authorization: "Bearer " + cred,
      },
    })
      .then((response) => {
        console.log(response.data);
        console.log("getAllBills");
        setBills(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log("inside error");
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          alert(error.response.data);
          if (error.response.data === "JWT Expired") {
            localStorage.clear();
            window.location.reload(false);
          }
        } else {
          console.log("Error", error.message);
        }
      });
  };

  return (
    <>
      <Container id="meterReadingsContainer" className="mt-5 mb-5">
        <Card border="primary" >
          <h3 className="mt-3" style={{fontWeight:"bolder"}}>Generated Bills</h3>
          <Table hover responsive borderless>
            <thead>
              <tr>
                <th>Email Id</th>
                <th>Electricity(D)</th>
                <th>Electricity(N)</th>
                <th>Gas</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Submission Date</th>
              </tr>
            </thead>
            <tbody>
              {bills &&
                bills.map((mReading) => {
                  return (
                    <tr>
                      <td id={mReading.id}>{mReading.email}</td>
                      <td>{mReading.eMeterReadingDay}</td>
                      <td>{mReading.eMeterReadingNight}</td>
                      <td>{mReading.gMeterReading}</td>
                      <td>{mReading.due}</td>
                      <td>{mReading.status}</td>
                      <td>{mReading.billDate}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Card>
      </Container>
    </>
  );
}

export default Bills;
