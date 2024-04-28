import React from 'react'
import './App.css'

// Components

import InputMovement from './components/InputMovement';
import ListTodos from './components/ListMovements';

const App = () => {

  return (
    <>
      <div className='container'>
        <InputMovement />
        <ListTodos />
      </div>
    </>
  )
}

export default App
