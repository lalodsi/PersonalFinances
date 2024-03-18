import React, { ChangeEventHandler, EventHandler, FormEventHandler, Fragment, useState } from 'react'

interface EditTodoProps {
  initialValue: string,
  id: number
}

const EditTodo = (props: EditTodoProps): JSX.Element => {
  const { initialValue, id } = props;
  const [description, setDescription] = useState<string>(initialValue);

  const handleChangeDescription: ChangeEventHandler<HTMLInputElement> = e => {
    setDescription(e.target.value);
  }

  const handleSubmit: FormEventHandler = async e => {
    e.preventDefault();
    try {
      const body = {
        description
      };
      console.log(body);
      
      const options: RequestInit = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }
      const response = await fetch(`http://localhost:5000/todos/${id}`, options);
      console.log(response.text);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Fragment>
      <div className="modal fade" id={`editModal${id}`} tabIndex={-1}>
          <div className="modal-dialog">
              <div className="modal-content">
              <div className="modal-header">
                  <h5 className="modal-title">Edit Todo</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                <input
                  type="text"
                  name="text"
                  className="form-control"
                  value={description}
                  onChange={handleChangeDescription}
                />
                </div>
                <div className="modal-footer">
                    <button type="submit" className="btn btn-warning" data-bs-dismiss="modal">Edit</button>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                </div>
              </form>
              </div>
          </div>
      </div>
      <button className='btn btn-warning' data-bs-toggle="modal" data-bs-target={`#editModal${id}`}>Edit</button>
    </Fragment>
  )
}

export default EditTodo