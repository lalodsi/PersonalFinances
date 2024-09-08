import React, { ChangeEventHandler, EventHandler, FormEventHandler, Fragment, useState } from 'react'

interface EditMovementProps {
  initialValue: number,
  id: number
}

const EditMovement = (props: EditMovementProps): JSX.Element => {
  const { initialValue, id } = props;
  const [quantity, setQuantity] = useState<number>(initialValue);

  const handleChangeQuantity: ChangeEventHandler<HTMLInputElement> = e => {
    setQuantity(parseFloat(e.target.value));
  }

  const handleSubmit: FormEventHandler = async e => {
    e.preventDefault();
    try {
      const body = {
        quantity
      };
      console.log(body);
      
      const options: RequestInit = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }
      const response = await fetch(`http://localhost:5000/api/movements/${id}`, options);
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
                  <h5 className="modal-title">Edit Movement</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                <input
                  type="text"
                  name="text"
                  className="form-control"
                  value={quantity}
                  onChange={handleChangeQuantity}
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

export default EditMovement