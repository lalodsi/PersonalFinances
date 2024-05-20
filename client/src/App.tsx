import React from 'react'
import './App.css'

// Views

import { MovementsView, SummaryView } from './Views';
import HomeView from './Views/PrincipalView';

const App = () => {

  return (
    <>
      <HomeView />
      <div className='container'>
        <MovementsView />
        <SummaryView />
      </div>
    </>
  )
}

export default App
