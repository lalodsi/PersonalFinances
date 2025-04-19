import React from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


// Views
import Login from './Views/Login';
import Register from './Views/Register/Register';
import {MovementsView, SummaryView} from './Views';
import HomeView from './Views/PrincipalView';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppRouter from './routes/AppRouter';

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
          <AppRouter />
          <ReactQueryDevtools />
      </QueryClientProvider>
  )
}

export default App
