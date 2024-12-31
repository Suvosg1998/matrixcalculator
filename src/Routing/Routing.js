import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Calculator from '../Components/Calculator'

const Routing = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Calculator />} />
        </Routes>
    </Router>
  )
}

export default Routing