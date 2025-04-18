import React, { Fragment, useEffect, useState } from 'react'
import EditMovement from './EditMovement';
import toAmountRepresentation from '../utils/toAmountRepresentation';
import { useMovements } from '../hooks/Movements/useMovements';
import { useDeleteMovements } from '../hooks/Movements/useDeleteMovements';


const ListMovements = () => {

  const { data: movements} = useMovements()
  const {mutate: eraseMovement} = useDeleteMovements()


  if (!movements)
    return <div>Loading</div>

  return (
    <Fragment>
      <table className="table table-borderless">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Quantity</th>
            <th scope="col">Date</th>
            {/* <th scope="col">Type</th> */}
            {/* <th scope="col">Edit</th>
            <th scope="col">Delete</th> */}
          </tr>
        </thead>
        <tbody>
          {
            movements.map((movement, i) => (
              <tr key={i}>
                <th scope='row'>{movement.description}</th>
                <td>{toAmountRepresentation(movement.quantity)}</td>
                <td>{new Date(movement.expense_date).toLocaleDateString()}</td>
                {/* <td>{movement.movement_type ? "Income" : "Expense"}</td> */}
                {/* <td>
                  <EditMovement initialValue={movement.quantity} id={movement.expense_id} />
                </td>
                <td>
                  <button className='btn btn-danger' onClick={() => eraseMovement(movement)}>Erase</button>
                </td> */}
              </tr>
            ))
          }
        </tbody>
      </table>
    </Fragment>
  )
}

export default ListMovements