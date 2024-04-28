import React, { ChangeEventHandler, FormEvent, FormEventHandler, Fragment, useState } from 'react'

const InputMovement = (): JSX.Element => {
  const [quantity, setQuantity] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [movementType, setMovementType] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");


  const onSubmitForm: FormEventHandler<HTMLFormElement> = async (e: FormEvent) => {
    e.preventDefault();
    console.log(`Movement: It's a ${movementType ? "income" : "expense"} for ${quantity} pesos on ${date}`);
    
    try {
      const body = { quantity, description, movementType, date };
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

  return (
    <Fragment>
      <h1 className='text-center mt-5'>Enter your movement</h1>
      <form className='d-flex' onSubmit={onSubmitForm}>
        <input
          type="number"
          name="number"
          className="form-control"
          value={quantity}
          onChange={e => setQuantity(parseFloat(e.target.value))}
        />
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleSetDescription}
        />
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
        <input
          type="date"
          className='form-control'
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <button className='btn btn-success' type='submit' >Add</button>
      </form>
    </Fragment>
  )
}

export default InputMovement