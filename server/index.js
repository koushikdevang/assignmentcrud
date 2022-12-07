const express = require('express');
const app = express();
const cors = require("cors");
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES

//CREATE A employee
app.post('/employee', async(req,res)=>{
    try {
        const {emp_name, salary, address} = req.body;
        const newEmployee = await pool.query("INSERT INTO emp (emp_name, salary, address) VALUES($1, $2, $3) RETURNING *",
         [emp_name, salary, address]
        );
        res.json(newEmployee);
        // console.log(req.body);
    } catch (error) {
        console.error(error.message);
    }
})

//get all employee
app.get("/employee", async(req,res)=>{
    try {
        const newEmployee = await pool.query("SELECT * FROM emp");
        res.json(newEmployee.rows);
    } catch (err) {
        console.log(err.message);
    }
});

//get a employee
app.get("/employee/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const emp = await pool.query("SELECT * FROM emp WHERE emp_id=$1",[id]);
        res.json(emp.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
})

//update a employee
app.put("/employee/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const {emp_name, salary, address} = req.body;
        const updateEmployee = await pool.query("UPDATE emp SET emp_name = $1, salary = $2, address= $3 WHERE emp_id = $4",[emp_name, salary, address, id]);
        res.json("Employee was updated")
    } catch (err) {
        console.log(err.message);
    }
}); 

//delete a employee
app.delete("/employee/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const deleteEmployee = await pool.query("DELETE FROM emp WHERE emp_id = $1",[id]);
        res.json("Employee was deleted!")
    } catch (err) {
        console.log(err.message);
    }
});





app.listen(5000,() =>{
    console.log("server is running on port 5000");
});