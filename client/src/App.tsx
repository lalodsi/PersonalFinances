import React from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


// Views
import Login from './Views/Login';
import Register from './Views/Login/Register';
import {MovementsView, SummaryView} from './Views';
import HomeView from './Views/PrincipalView';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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

const client = new QueryClient({
})

const App = () => {
  return (
      <QueryClientProvider client={client}>
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
          <ReactQueryDevtools />
      </QueryClientProvider>
  )
}

export default App
