import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import editIcon from "./../assets/edit.png";
import deleteIcon from "./../assets/delete.JPG";
import "../App.css";


const EmployeeDataTable = () => {

  const navigate = useNavigate();
  const baseURL = "http://localhost:5000";
  const [employees, setEmployees] = useState([]);

  const setEmployeeData = () => {
    axios.get(baseURL + "/employee").then((response) => {
      setEmployees(response.data);
    }).catch(error => {
      alert("Error Ocurred while loading data:" + error);
    });
  }

  useEffect(() => {
    setEmployeeData();
  }, []);


  const removeEmployee = (emp_id) => {
    axios.delete(baseURL + "/employee/" + emp_id).then((response) => {
      alert("Employee record " + emp_id + " deleted!");
      setEmployeeData();
      navigate('/read')

    }).catch(error => {
      alert("Error Ocurred in removeEmployee:" + error);
    });
  }

  // const removeAllEmployee = (id) => {
  //   axios.delete(baseURL + "/employees").then((response) => {
  //     alert("All Employees deleted!");
  //     setEmployeeData();
  //     navigate('/read')
  //   }).catch(error => {
  //     alert("Error Ocurred in removeEmployee:" + error);
  //   });
  // }

  return (
    <div class="card-body">
      <br>
      </br>
      <nav>
        <button
          className="btn btn-primary nav-item active"
          onClick={() => navigate("/create")}>
          Add Employee
        </button>
      </nav>


      <br></br>
      <div className="col-md-6">
        <h4>Employees List</h4>

        <div class="container">
          <div class="row">
            <div class="col-12">
              <table class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Salary</th>
                    <th>Address</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    employees &&
                    employees.map((employee, index) => (

                      <tr>
                        <th scope="row">{employee.emp_id}</th>
                        <td>{employee.emp_name}</td>
                        <td>{employee.salary}</td>
                        <td>{employee.address}</td>
                        <td >
                          <Link to={"/edit/" + employee.emp_id}><img src={editIcon} alt="Edit" width="50" height="30" title="Edit" />
                          </Link>
                          <button
                            onClick={() => removeEmployee(employee.emp_id)} className="button"
                          > <img src={deleteIcon} alt="Remove" title="Remove" width="30" height="30" />
                          </button>

                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* <button className="btn btn-sm btn-danger"
          onClick={() => removeAllEmployee()}>
          Remove All
        </button> */}
      </div>

    </div>

  );
}
export default EmployeeDataTable;