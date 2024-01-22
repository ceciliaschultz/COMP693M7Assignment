import express from 'express'
import {getAllEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee} from '../controllers/employee.js'
import {} from 'dotenv/config'

const router =express.Router()

router.route('/api/employees')
    .get(getAllEmployees)
    .post(createEmployee)

router.route('/api/employees/:id')
    // retrieve a single employee
    .get(getEmployee)
    // update a single employee
    .patch(updateEmployee)
    .delete(deleteEmployee)

// router.route('/')
//     .get(getAllEmployees)
//     .post(createEmployee)



export default router

