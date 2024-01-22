import React from 'react'
import { Card } from 'react-bootstrap'
// stateless component
export default function EmployeeReport() {
    return(
        <Card>
            <Card.Header as="h5">Employee Reports </Card.Header>
            <Card.Body>
                <Card.Text>
                    This is a placeholder for employee reports. 
                </Card.Text>
            </Card.Body>
        </Card>
    )
}