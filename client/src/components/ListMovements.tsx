import React, { Fragment, useEffect, useState } from 'react'
import EditMovement from './EditMovement';
import toAmountRepresentation from '../utils/toAmountRepresentation';

interface movement {
  "expense_id": number,
  description: string
  "quantity": number,
  "movement_type": boolean,
  "expense_date": string
}
const ListMovements = () => {

  const [movements, setMovements] = useState<movement[]>([]);

  const getmovements = async () => {
    try {
      const options: RequestInit = {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      };
      const response = await fetch("http://localhost:5000/movements/", options);
      const jsonResponse: movement[] = await response.json();
      setMovements(jsonResponse);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getmovements();
  },[]);

  const eraseMovement = async (props: movement) => {
    const { expense_id } = props;
    const options: RequestInit = {
      method: "DELETE",
      headers: { "Content-Type": "application/json"}
    }
    const response = await fetch(`http://localhost:5000/movements/${expense_id}`, options);
    console.log(`Deleted ${expense_id}`);
    setMovements(movements.filter(movement => movement.expense_id !== props.expense_id))
  }

  return (
    <Fragment>
      <table className="table table-borderless">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Quantity</th>
            {/* <th scope="col">Date</th> */}
            {/* <th scope="col">Type</th> */}
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            movements.map((movement, i) => (
              <tr key={i}>
                <th scope='row'>{movement.description}</th>
                <td>{toAmountRepresentation(movement.quantity)}</td>
                {/* <td>{movement.expense_date}</td> */}
                {/* <td>{movement.movement_type ? "Income" : "Expense"}</td> */}
                <td>
                  <EditMovement initialValue={movement.quantity} id={movement.expense_id} />
                </td>
                <td>
                  <button className='btn btn-danger' onClick={() => eraseMovement(movement)}>Erase</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </Fragment>
  )
}

export default ListMovements