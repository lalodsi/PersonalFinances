import toAmountRepresentation from "../../utils/toAmountRepresentation";
import "./styles.css"
import React, { ChangeEventHandler, FormEvent, FormEventHandler, Fragment, useState } from 'react'

const InputMovement = (): JSX.Element => {
  const [quantity, setQuantity] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [movementType, setMovementType] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");


  const onSubmitForm: FormEventHandler<HTMLFormElement> = async (e: FormEvent) => {
    e.preventDefault();
    console.log(`Movement: It's a ${movementType ? "income" : "expense"} for ${quantity} pesos on ${date}`);
    
    try {
      const cleaned = quantity.replace(/[,\.]/g, '')
      const body = { quantity: cleaned, description, movementType, date };
      const headers: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }
      const response = await fetch("http://localhost:5000/movements", headers)
      console.log("done");
      window.location.href = "/";

      // window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  }

  const handleSetDescription: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value ?? "No description"
    console.log(value);
    setDescription(value)
  }

  const handleQuantityChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value
    const cleaned = value.replace(/[,\.]/g, '');

    const inAmount = toAmountRepresentation(parseInt(cleaned))
    console.log(inAmount);

    setQuantity(inAmount)
  }

  return (
    <Fragment>
      <h3 className='text-center mt-5'>Enter your movement</h3>
      <form className='d-flex flex-column' onSubmit={onSubmitForm}>
        <div className='d-flex flex-row'>
          <div className='InputMovement_PropertyName text-center'>Quantity</div>
          <input
            type="text"
            name="number"
            className="form-control"
            value={quantity}
            placeholder="0.00"
            onChange={handleQuantityChange}
          />
        </div>
        <div className='d-flex flex-row'>
          <div className='InputMovement_PropertyName text-center'>Description</div>
          <input
            type="text"
            name="description"
            className="form-control"
            value={description}
            onChange={handleSetDescription}
          />
        </div>
        <div className='d-flex flex-row'>
          <div className='InputMovement_PropertyName text-center'>Type</div>
          <select
            defaultValue={"Expense"}
            className='form-select'
            name="" id=""
            onChange={e => setMovementType(e.target.value === "Entry")}
          >
            {/* <option value="">Select the movement type</option> */}
            <option value="Expense">Expense</option>
            <option value="Entry">Entry</option>
          </select>
        </div>
        <div className='d-flex flex-column'>
          <div className='InputMovement_PropertyName text-center'>Date</div>
          <input
            type="date"
            className='form-control'
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <button className='btn btn-success' type='submit' >Add</button>
      </form>
    </Fragment>
  )
}

export default InputMovement