import React from 'react'
import InputMovement from '../components/InputMovement';
import ListMovements from '../components/ListMovements';

const MovementsView = () => {
  return (
    <React.Fragment>
        <InputMovement />
        <ListMovements />
    </React.Fragment>
  )
}

export default MovementsView