// The employee controller

import Employee from '../models/Employee.js'
import mongoose from 'mongoose'   // mongoose.Types.ObjectId.isValid

// Retrieve all employees
// ----------------------------------
const getAllEmployees = async (req, res) => {
    let func = 'getAllEmployees'
    console.log(`\n*** In ${func}..`)
    try {
        const employees = await Employee.find({})
        res.status(200).json({employees, count:employees.length})
        // res.status(200).json({employees})
        // res.send('Get all employees')

    } catch (err) {
        console.log(`### exception caught in ${func}: ${err}`)
        res.status(500).json({msg:err})
    }
}

// Retrieve a single employee
// ----------------------------------
const getEmployee = async (req, res) => {
    let func = 'getEmployee'
    console.log(`\n*** In ${func}..`)
    try {
        // this fails because id is such a generic name
        // let id = req.params
        // const employees = await Employee.findOne({_id:id}) 

        // to fix, we take the :id and create an alias employeeId
        let {id:employeeId} = req.params 
        
        let isValidObjectId = mongoose.Types.ObjectId.isValid(employeeId)
        if (!isValidObjectId) {
            return res.status(404).json({msg: `Invalid object ID format (${employeeId}).`})
        }
        const employee = await Employee.findOne({ _id: employeeId}) // this will choke if it is not a valid object id format
        if (employee == null) {
            return res.status(404).json({msg: `No employee with ID ${employeeId} found.`})
        }
        res.status(200).json({employee})

    } catch (err) {
        console.log(`### exception caught in ${func} line ${line}: ${err}`)
        res.status(500).json({msg:err})
    }
}

// Delete an employee
// -----------------------------------------------
const deleteEmployee = async (req, res) => {
    let func = 'deleteEmployee'
    console.log(`\n*** In ${func}..`)
    try {

        // to fix, we take the :id and create an alias employeeId
        let {id:employeeId} = req.params 
        
        let isValidObjectId = mongoose.Types.ObjectId.isValid(employeeId)
        if (!isValidObjectId) {
            return res.status(404).json({msg: `Invalid object ID format (${employeeId}).`})
        }
        const employee = await Employee.findOneAndDelete({ _id: employeeId}) // this will choke if it is not a valid object id format
        if (employee == null) {
            return res.status(404).json({msg: `No employee with ID ${employeeId} found.`})
        }
        res.status(200).json({msg:'Employee successfully deleted'})

    } catch (err) {
        console.log(`### exception caught in ${func} line ${line}: ${err}`)
        res.status(500).json({msg:err})
    }
}

// create employee
// -----------------------------------------------
const createEmployee =  async (req, res) => {
    let func = 'createEmployee'
    console.log(`\n*** In ${func}..`)
    try {
        //let body = JSON.stringify(req.body) // this returns a string with json like data
        //console.log(`req.body= ${body}`)

        const employee = await Employee.create(req.body)
        //console.log(`employee from req.body= ${employee}`)
        //res.status(201).json({msg: 'Employee added sucessfully'}) 
        res.status(201).json({employee}) 

    } catch (err) {
        console.log(`### exception caught in ${func}: ${err}`)
        res.status(500).json({msg:err})
    }
}

// Update an employee
// ----------------------------
// const updateEmployee = asynch (req, res) => {
//     // res.send('Update an employee')
// }

const updateEmployee = async (req, res) => {
    let func = 'updateEmployee'
    console.log(`\n*** In ${func}..`)
    try {
        // to fix, we take the :id and create an alias employeeId
        let {id:employeeId} = req.params 

        let body = JSON.stringify(req.body) // this returns a string with json like data
        console.log(`req.body= ${body}`)
        
        let isValidObjectId = mongoose.Types.ObjectId.isValid(employeeId)
        if (!isValidObjectId) {
            return res.status(404).json({msg: `Invalid object ID format (${employeeId}).`})
        }
        const employee = await Employee.findOneAndUpdate({ _id: employeeId}, req.body,
            {new: true,  // return the newly updated object
            runValidators: true}) // this will choke if it is not a valid object id format
        if (employee == null) {
            return res.status(404).json({msg: `No employee with ID ${employeeId} found.`})
        }
        res.status(200).json({employee, msg:'Employee successfully updated'})

    } catch (err) {
        console.log(`### exception caught in ${func} line ${line}: ${err}`)
        res.status(500).json({msg:err})
    }
}




// export our functions
export {
    getAllEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
}