import { useState } from 'react';
import './components.css';

function PaintBox(props) {

  const item = props.item;

  // used to specify edit type (full or partial)
  const edit = props.edit;

  // unique id's for the forms and labels
  const formId = item.id + "paint-form-id";

  const [count, setCount] = useState(item.stock);

  // update the stock in the component and in parent
  function handleStockChange(value) {
    let newStock = parseInt(value, 10);

    if (isNaN(newStock)) {
      newStock = '';
    }

    // update the count, locally on the component.
    setCount(newStock);

    // update the parent stock.
    props.onStockChange(item.id, newStock);
  }

  return (
    <>
      {/* Paint Stock Form */}
      {/* Would refactor into another component if re-used */}
      <div className="paint-stock" key={item.id}>
        <p>{item.name}</p>
        <div className="paint-box"
          style={{ backgroundColor: item.hex }} />

        {edit === "full" ? (
          <>
            <label htmlFor={formId}>Stock:</label>
            <input
              type="number"
              id={formId}
              name="paint-name"
              min="0"
              max="100"
              value={count}
              onChange={(e) => handleStockChange(e.target.value)} />
          </>
        ) : (
          <p>Stock: {item.stock}</p>
        )}
      </div >
    </>
  );
}

export default PaintBox;