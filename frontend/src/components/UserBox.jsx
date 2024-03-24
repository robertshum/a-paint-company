import { useState } from 'react';
import './components.css';

function UserBox(props) {

  const user = props.item;

  // Initialize state for the checkbox value
  const [isChecked, setIsChecked] = useState(user.enabled);

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

  const handleEnabledChange = () => {
    // Toggle the value of isChecked when the checkbox is clicked
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className="paint-stock" key={user.id}>
        <p>Username: {user.userName}</p>
        <p>First Name: {user.firstName}</p>
        <p>Last Name: {user.lastName}</p>
        <p>Role: {user.role}</p>
        <span className='inline'>
          <p>Enabled: </p>
          <input type="checkbox"
            checked={isChecked}
            onChange={handleEnabledChange} />
        </span >
      </div >
    </>
  );
}

export default UserBox;