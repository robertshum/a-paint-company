import { useState } from 'react';
import './components.css';

function PaintBox(props) {

  const item = props.item;

  // used to specify edit type (full or partial)
  const edit = props.edit;

  const setDisableButton = props.setDisableButton;

  // unique id's for the forms and labels
  const formId = item.id + "paint-form-id";

  const [count, setCount] = useState(item.stock);
  const [stockError, setStockError] = useState(false);

  // update the stock in the component and in parent
  function handleStockChange(value) {
    let newStock = parseInt(value, 10);

    // Handle error checking
    if (isNaN(newStock)) {
      setCount('');
      setStockError(true);
      setDisableButton(true);
      return;
    }

    // update the count, locally on the component.
    setCount(newStock);

    // disable the submit button, enable the red glow
    if (newStock > 100 || newStock < 0) {
      setStockError(true);
      setDisableButton(true);
      return;
    }

    // enable submit button, disable the red glow
    setDisableButton(false);
    setStockError(false);

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
              className={stockError ? 'stockError' : ''}
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