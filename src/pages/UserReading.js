import React from 'react'
import "../css/UserReading.css"
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';

function UserReading() {

  return (
    <>
    <Container id="userReadingContainer" className='mt-3'>
    <Table hover responsive >
      <thead>
        <tr>
          <th >Date</th>
          <th>Electricity Usage (D)</th>
          <th>Eletricity Usage (N)</th>
          <th>Gas Usage</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2022-04-01</td>
          <td>100</td>
          <td>200</td>
          <td>300</td>
          <td>45.5</td>
          <td><Button size='sm' variant='secondary'>Pay</Button></td>
        </tr>
        <tr>
        <td>2022-04-01</td>
          <td>100</td>
          <td>200</td>
          <td>300</td>
          <td>45.5</td>
          <td><Button size='sm' variant='secondary'>Pay</Button></td>
        </tr>
        <tr>
        <td>2022-04-01</td>
          <td>100</td>
          <td>200</td>
          <td>300</td>
          <td>45.5</td>
          <td><Button size='sm' variant='secondary'>Pay</Button></td>
        </tr>
      </tbody>
    </Table>
    </Container>
    </>
  )
}

export default UserReading