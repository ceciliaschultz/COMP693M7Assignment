import React from 'react'
import ReactDOM  from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Page from './Page.jsx'

// to run in strict mode, we must wrap the EmployeeList component with React.StrictMode
ReactDOM.render(
    <Router>
      <React.StrictMode>
        <Page />
      </React.StrictMode>
    </Router>,
    document.getElementById('content')
)
