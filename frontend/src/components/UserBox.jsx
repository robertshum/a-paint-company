import { useState } from 'react';
import './components.css';

function UserBox(props) {

  const item = props.item;
  // const edit = props.edit;

  // const [count, setCount] = useState(item.stock);

  // function handleStockChange(value) {
  //   let newStock = parseInt(value, 10);

  //   if (isNaN(newStock)) {
  //     newStock = '';
  //   }

  //   // update the count, locally on the component.
  //   setCount(newStock);

  //   // update the parent stock.
  //   props.handleGeneralUserChange(item.id, newStock);
  // }

  return (
    <>
      <div className="paint-stock" key={item.id}>
        <p>Username: {item.userName}</p>
        <p>First Name: {item.firstName}</p>
        <p>Last Name: {item.lastName}</p>
        <p>Role: {item.role}</p>
        <p>Enabled: {item.enabled ? 'true' : 'false'}</p>
      </div >
    </>
  );
}

export default UserBox;