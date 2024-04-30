import React from 'react'
import './App.css'

// Views

import { MovementsView, SummaryView } from './Views';

const App = () => {

  return (
    <>
      <div className='container'>
        <MovementsView />
        <SummaryView />
      </div>
    </>
  )
}

export default App
