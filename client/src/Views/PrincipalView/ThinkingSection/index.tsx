import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';

const ThinkingSection = () => {
    const [quantity, setQuantity] = useState(0);
    const [values, setValues] = useState<number[]>([]);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const qty = parseInt(e.target.value, 10);
        setQuantity(qty);
        setValues(Array(qty).fill(0));
    };

    const handleValueChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newValues = [...values];
        newValues[index] = parseFloat(e.target.value) || 0;
        setValues(newValues);
    };

    const totalSum = values.reduce((sum, value) => sum + value, 0);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault()
      console.log("Submitting next info");
      console.log(values);
      
    }

    return (
      <div className="container mt-5">
        <h3>Calculate</h3>
        <form onSubmit={e => handleSubmit(e)}>
          <div className="form-group">
            <div className="row">
              <div className="col">
                <label htmlFor="quantity">Quantity of Sources</label>
              </div>
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  required
                />
              </div>
            </div>
          </div>
          <div id="sources-container" className="form-group">
            {Array.from({ length: quantity }).map((_, index) => (
              <div className="row" key={index}>
                <div className="col">
                  Source {index} quantity
                </div>
                <div className="col">
                  <input
                    type="number"
                    className="form-control"
                    placeholder={`Source ${index + 1} value`}
                    value={values[index] || ''}
                    onChange={(e) => handleValueChange(index, e)}
                  />
                </div>
              </div>
            ))}
          </div>
          {quantity > 0 && (
            <div id="sum-container" className="form-group">
              <label>Total Sum</label>
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    value={totalSum.toFixed(2)}
                    readOnly
                  />
                </div>
              </div>
            </div>
          )}
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
};


export default ThinkingSection