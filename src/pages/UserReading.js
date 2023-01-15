import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../css/UserReading.css"
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';

function UserReading() {

  const [meterReadings, setMeterReadings] = useState([]);
  const [price, setPrice] = useState([]);
  let cred = localStorage.getItem("jwt");

  const getUnPaidBill = async () => {
    console.log("get getBill");
    await Axios.get("http://localhost:8080/customer/getUnPaidBill", {
      headers: {
        Authorization: "Bearer " + cred,
      },
    })
      .then((response) => {
        setMeterReadings(response.data);
        console.log("meter readings ", meterReadings);
        console.log("response.data ",response.data)
        if(response.data==="JWT Expired")
        {
          console.log("clearing jwt")
          localStorage.clear();
        }
       
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          alert(error.response.data);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  const payBill = async (id, amt) => {
    //Prevent page reload
    await Axios.post(
      "http://localhost:8080/customer/payBill?billId=" + id + "&amt=" + amt,
      null,
      {
        headers: {
          Authorization: "Bearer " + cred,
        },
      }
    )
      .then((response) => {
        console.log(response.data);
        console.log("Bill Paid successfully");
        window.location.reload(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          alert(error.response.data);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  useEffect(() => {
    getUnPaidBill();
  }, []);

  return (
    <>
    <Container id="userReadingContainer" className='mt-3'>
      <h3>Bill</h3>
    <Table hover responsive >
      <thead>
        <tr>
          <th >Date</th>
          <th>Electricity Usage Day (kWh)</th>
          <th>Eletricity Usage Night (kWh)</th>
          <th>Gas Usage (kWh)</th>
          <th>Amount (&#163;)</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {meterReadings &&
            meterReadings.map((mReading) => {
              return (
                <tr>
                  <td id={mReading.id}>{mReading.billDate}</td>
                  <td>{mReading.eMeterReadingDay}</td>
                  <td>{mReading.eMeterReadingNight}</td>
                  <td>{mReading.gMeterReading}</td>
                  <td>{mReading.due}&#163;</td>
                  <td>
                    <Button
                      size='md' variant='secondary'
                      onClick={() => {
                        payBill(mReading.id, mReading.due);
                      }}
                    >
                      Pay
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
        {/* <td>2022-04-01</td>
          <td>100</td>
          <td>200</td>
          <td>300</td>
          <td>45.5</td>
          <td><Button size='sm' variant='secondary'>Pay</Button></td>
        </tr> */}
    </Table>
    </Container>
    </>
  )
}

export default UserReading