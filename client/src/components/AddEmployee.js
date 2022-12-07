import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert } from 'react-bootstrap';

const EmployeeForm = () => {
  const baseURL = "http://localhost:5000/employee";
  const navigate = useNavigate();
  const [enteredName, setName] = useState('');
  const [enteredSalary, setSalary] = useState('');
  const [enteredAddress, setAddress] = useState('');
  
  
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const salaryChangeHandler = (event) => {
    setSalary(event.target.value);
  };

  const roleChangeHandler = (event) => {
    setAddress(event.target.value);
  };


  const submitActionHandler = (event) => {
    event.preventDefault();
    axios
      .post(baseURL, {
        emp_name: enteredName,
        salary: enteredSalary,
        address: enteredAddress
      })
      .then((response) => {
        alert("Employee "+ enteredName +" added!");
        navigate("/read");
      }).catch(error => { 
        alert("error==="+error);
      });
    
  };

  const cancelHandler = () =>{
    //reset the values of input fields
    setName('');
    setSalary('');
    setAddress('');
    navigate("/read");

  }
    return(  
      <Alert variant='primary'>
      <Container>
      <Form onSubmit={submitActionHandler}>
        <Form.Group controlId="form.Name">
            <Form.Label>Employee Name</Form.Label>
            <Form.Control type="text" value={enteredName} onChange={nameChangeHandler} placeholder="Enter Employee Name" required/>
        </Form.Group>
        <Form.Group  controlId="form.Salary">
            <Form.Label>Salary</Form.Label>
            <Form.Control type="text" value={enteredSalary} onChange={salaryChangeHandler} placeholder="Enter Salary" required/>
        </Form.Group>
        <Form.Group  controlId="form.Role">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" value={enteredAddress} onChange={roleChangeHandler} placeholder="Enter Role" required/>
        </Form.Group>
        <br></br>
        <Button type='submit'>Add Employee</Button>
        &nbsp;&nbsp;&nbsp;
        <Button type='submit' onClick={()=>cancelHandler()}>Cancel</Button>
      </Form>
      
    </Container>     
    </Alert>      
    
    );
}
export default EmployeeForm;