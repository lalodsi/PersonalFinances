import React from 'react'
import './App.css'

// Components

import InputMovement from './components/InputMovement';
import ListMovements from './components/ListMovements';

const App = () => {

  return (
    <>
      <div className='container'>
        <InputMovement />
        <ListMovements />
      </div>
    </>
  )
}

export default App
