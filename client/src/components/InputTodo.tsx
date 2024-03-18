import React, { FormEvent, Fragment, useState } from 'react'

const InputTodo = (): JSX.Element => {
  const [description, setDescription] = useState<string>("");

  const onSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const body = { description };
      const headers: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }
      const response = await fetch("http://localhost:5000/todos", headers)
      const json = await response.json()
      console.log(json);

      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Fragment>
      <h1 className='text-center mt-5'>Todo List</h1>
      <form className='d-flex' onSubmit={onSubmitForm}>
        <input
          type="text"
          name="text"
          className="form-control"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className='btn btn-success' type='submit' >Add</button>
      </form>
    </Fragment>
  )
}

export default InputTodo