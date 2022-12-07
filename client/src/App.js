import React from 'react';
import {Routes,Route,Navigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import EmployeeDataTable from './components/EmployeeDataTable';

function App() { 

  return (
   
    <div  class="container card mb-4 box-shadow">
    
        <div class="card-header">
            <h4 class="my-0 font-weight-normal">Employee Database</h4>
          </div>

    <Routes>
        <Route path="/" element={<Navigate to="/read" />} />
        <Route exact path="/create" element={<AddEmployee/>}/>
        <Route exact path="/read" element={<EmployeeDataTable/>}/>
        <Route path="/edit/:id" element={<EditEmployee/>}/>
      </Routes>

    </div>
  );
}

export default App;
