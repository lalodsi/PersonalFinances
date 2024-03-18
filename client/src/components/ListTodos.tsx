import React, { Fragment, useEffect, useState } from 'react'
import EditTodo from './EditTodo';

interface todo {
  "todo_id": number,
  "description": string
}
const ListTodos = () => {

  const [todos, setTodos] = useState<todo[]>([]);

  const getTodos = async () => {
    try {
      const options: RequestInit = {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      };
      const response = await fetch("http://localhost:5000/todos/", options);
      const jsonResponse = await response.json();
      setTodos(jsonResponse);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getTodos();
  },[]);

  const eraseTodo = async (props: todo) => {
    const {todo_id, description} = props;
    const options: RequestInit = {
      method: "DELETE",
      headers: { "Content-Type": "application/json"}
    }
    const response = await fetch(`http://localhost:5000/todos/${todo_id}`, options);
    console.log(`Deleted ${todo_id}: ${description}`);
    setTodos(todos.filter(todo => todo.todo_id !== props.todo_id))
  }

  return (
    <Fragment>
      <table className="table table-borderless">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            todos.map((todo, i) => (
              <tr key={i}>
                <th scope='row'>{todo['todo_id']}</th>
                <td>{todo.description}</td>
                <td>
                  <EditTodo initialValue={todo.description} id={todo.todo_id} />
                </td>
                <td>
                  <button className='btn btn-danger' onClick={() => eraseTodo(todo)}>Erase</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </Fragment>
  )
}

export default ListTodos