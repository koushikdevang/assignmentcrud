import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert } from 'react-bootstrap';

const EmployeeForm = () => {

  const editURL = "http://localhost:5000/employee/";
  const navigate = useNavigate();
  const param = useParams();
  console.log("parammmmmm",param);
  const [empId, setEmpId] = useState('');
  const [empName, setName] = useState('');
  const [empSalary, setSalary] = useState('');
  const [empRole, setRole] = useState('');

useEffect(() => {

  axios.get(editURL+param.id).then((response) => {
    console.log(response);
    const empData = response.data;
    setEmpId(empData.emp_id);
    setName(empData.emp_name);
    setSalary(empData.salary);
    setRole(empData.address);

  }).catch(error => { 
    alert("Error Ocurred getting employee detail:"+ error);
  });
}, []);


  const nameChangeHandler = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  const salaryChangeHandler = (event) => {
    setSalary(event.target.value);
  };

  const roleChangeHandler = (event) => {
    setRole(event.target.value);
  };


  const submitActionHandler = (event) => {
    event.preventDefault();
    axios
      .put(editURL+param.id, {
        emp_id: empId,
        emp_name: empName,
        address: empRole,
        salary: empSalary
      })
      .then((response) => {
        alert("Employee "+ empId +" updated!");
        navigate('/read')

      }).catch(error => { 
        alert("Error Ocurred updating employee:"+ error);
      });
      
  };

    return(  
      <Alert variant='primary'>
      <Container>
      <Form onSubmit={submitActionHandler} id="data">
      <Form.Group  controlId="form.id">
            <Form.Label>Id</Form.Label>
            <Form.Control type="number" value={empId} readonly='readonly'/>
        </Form.Group>
        <Form.Group controlId="form.Name">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" value={empName} onChange={nameChangeHandler} placeholder="Enter User Name" required/>
        </Form.Group>
        <Form.Group controlId="form.Salary">
            <Form.Label>User Salary</Form.Label>
            <Form.Control type="text" value={empSalary} onChange={salaryChangeHandler} placeholder="Enter User Salary" required/>
        </Form.Group>
        <Form.Group  controlId="form.Role">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" value={empRole} onChange={roleChangeHandler} placeholder="Enter Role" required/>
        </Form.Group>
        <br></br>
        <Button type='submit'>Update Employee</Button>
        &nbsp;&nbsp;&nbsp;
        <Button type='submit' onClick={()=>navigate("/read")}>Cancel</Button>
      </Form>
    </Container>     
    </Alert>      
    
    );
}
export default EmployeeForm;