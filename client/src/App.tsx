import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Views
import Login from './Views/Login';
import Register from './Views/Login/Register';
import { MovementsView, SummaryView } from './Views';
import HomeView from './Views/PrincipalView';

const Content = () => {
  return (
  <React.Fragment>
    <HomeView />
    <div className='container'>
      <MovementsView />
      <SummaryView />
    </div>
  </React.Fragment>)
}

const App = () => {

  return (
    <Router>
       <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/content">Content</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/content" element={<Content />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
