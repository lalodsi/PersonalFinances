import React from 'react'
import InputMovement from '../../components/InputMovement';
import ListMovements from '../../components/ListMovements';
import "./styles.css"

const MovementsView = () => {
  return (
    <React.Fragment>
        <InputMovement />
        <h2 className='text-center mt-5'>Last 10 movements</h2>
        <ListMovements />
    </React.Fragment>
  )
}

export default MovementsView