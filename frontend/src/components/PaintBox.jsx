import { useState } from 'react';
import './components.css';

function PaintBox(props) {

  const item = props.item;
  const edit = props.edit;

  const [count, setCount] = useState(item.stock);

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
      <div className="paint-stock" key={item.id}>
        <p>{item.name}</p>
        <div className="paint-box"
          style={{ backgroundColor: item.hex }} />

        {edit === "full" ? (
          <input
            type="number"
            id="paint-form"
            name="paint-name"
            min="0"
            max="100"
            value={count}
            onChange={(e) => handleStockChange(e.target.value)} />
        ) : (
          <p>Stock: {item.stock}</p>
        )}
      </div >
    </>
  );
}

export default PaintBox;