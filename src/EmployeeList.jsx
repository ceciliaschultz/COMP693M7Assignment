// M7 Assignment: Add confirmation modal to delete button
// Maria Cecilia Schultz

import React from 'react'
import { Badge, Button, Table, Card, Modal, Container} from 'react-bootstrap'
import { useLocation, Link } from 'react-router-dom'
import EmployeeFilter from './EmployeeFilter.jsx'
import EmployeeAdd from './EmployeeAdd.jsx'

// stateless component 
function EmployeeTable(props) {
    // get the entire url
    const { search } = useLocation()
    // get the parameters from the url
    const params = new URLSearchParams(search)
    // get the 'employed' parameter specifically. 
    const employedQuery = params.get('employed')

    // if employed is passed in the querystring, use it for the filter,
    // otherwise (i.e. we want all employees, so we want to pass true to the filter)
    const employeeRows = props.employees
    .filter(emp => employedQuery==null ? true :  String(emp.currentlyEmployed) == employedQuery )
    .map(employee =>
        <EmployeeRow
            key={employee._id}
            employee={employee}
            deleteEmployee={props.deleteEmployee}
        />
    )
    return (
        <Card>
            <Card.Header as="h5">All Employees <Badge bg="secondary">{employeeRows.length}</Badge></Card.Header>
            <Card.Body>
                <Card.Text>
                    <Table striped size="sm">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Extension</th>
                                <th>Email</th>
                                <th>Title</th>
                                <th>Date Hired</th>
                                <th>Currently Employed?</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeeRows}
                        </tbody>
                    </Table>
                </Card.Text>
            </Card.Body>
        </Card>

    )
}


// class component
export class EmployeeRow extends React.Component {
    constructor() {
        super()
        this.state= {
            modalVisible: false
        }
        this.toggleModal=this.toggleModal.bind(this)
        this.handleDeleteEmployee=this.handleDeleteEmployee.bind(this)
    }

    toggleModal() {
        this.setState({modalVisible: !this.state.modalVisible,})
    }

    handleDeleteEmployee() {
        this.props.deleteEmployee(this.props.employee._id)
        this.toggleModal()
    }

    render() {
        return (
            <tr>
                <td><Link to={`/edit/${this.props.employee._id}`}>{this.props.employee.name}</Link></td>
                <td>{this.props.employee.extension}</td>
                <td>{this.props.employee.email}</td>
                <td>{this.props.employee.title}</td>
                <td>{this.props.employee.dateHired.toDateString()}</td>
                <td>{this.props.employee.currentlyEmployed ? 'Yes' : 'No'}</td>
                

                <td>
                    <>
                        <div className='delEmployee'>
                            <Button 
                                variant="danger" 
                                size="sm" 
                                onClick={this.toggleModal}
                            > X
                            </Button>
                        </div>

                        <Modal show={this.state.modalVisible} onHide={this.toggleModal} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete Employee</Modal.Title>
                            </Modal.Header>
                            
                            <Modal.Body>
                                <Container fluid>
                                    Are you sure you want to delete this employee?
                                </Container>
                            </Modal.Body>
                            
                            <Modal.Footer>
                                <Button 
                                    type="submit" 
                                    variant="danger" 
                                    size="sm" 
                                    className="mt-4"
                                    onClick={this.toggleModal}
                                    >
                                    Cancel
                                </Button>

                                <Button 
                                    type="submit" 
                                    variant="success" 
                                    size="sm" 
                                    className="mt-4"
                                    onClick={this.handleDeleteEmployee}
                                    >
                                    Yes
                                </Button>
                            </Modal.Footer>

                        </Modal>
                    </>
                </td>


            </tr>
        )
    } 
}

export default class EmployeeList extends React.Component {
    constructor() {
        super()
        this.state = {
            employees: []
        }
        this.createEmployee = this.createEmployee.bind(this)
        this.deleteEmployee=this.deleteEmployee.bind(this)
    }
    loadData() {
        fetch('/api/employees')
        .then(response => response.json())
        .then(data => {
            data.employees.forEach(emp => {
                emp.dateHired = new Date(emp.dateHired)
            })
            this.setState({employees: data.employees})
        })
    }
    componentDidMount() {
        this.loadData()
    }
    createEmployee(emp) {
        fetch('/api/employees', {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(emp)
        })
        .then(resp => resp.json())
        .then(newEmployeeData => {
            newEmployeeData.employee.dateHired= new Date(newEmployeeData.employee.dateHired)
            const newEmployeeList = this.state.employees.concat(newEmployeeData.employee)
            this.setState({employees:newEmployeeList})
        })
        .catch(err=> console.log(err))

    }

    deleteEmployee(id) {
        fetch(`/api/employees/${id}`, {method:'DELETE'})
        .then(resp => {
            if (resp.ok) {
                this.loadData()
            } else {
                console.log('Failed to delete employee')
            }
        })
        
    }
    render() {
        return (
            <React.Fragment>
                <EmployeeAdd createEmployee={this.createEmployee} />
                <EmployeeFilter />
                <EmployeeTable employees={this.state.employees} deleteEmployee={this.deleteEmployee} />
            </React.Fragment>
        )
    }
}