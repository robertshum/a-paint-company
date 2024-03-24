import { useQuery } from 'react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserBox from '../components/UserBox';

const API_LOC = import.meta.env.VITE_API_LOCATION;
const PORT = import.meta.env.VITE_API_PORT;
function Admin() {

  console.log(API_LOC);
  const navigate = useNavigate();
  const [updatedStock, setUpdatedStock] = useState(null);

  // state for enabled/disabled
  const [selectedValue, setSelectedValue] = useState('');
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // Get Paint Stock on the main page
  const { data, isLoading, error } = useQuery('users', async () => {
    const response = await fetch(`${API_LOC}:${PORT}/api/users`);
    if (!response.ok) {
      console.log('Network response was not ok');
    }

    return response.json();
  });

  function handleGeneralUserChange(id, newStock) {

    // const updatedStock = data.map(item => item.id === id ? { ...item, stock: newStock } : item);

    // setUpdatedStock(updatedStock);
  }

  function handleGeneralStockChange(id, newStock) {

    const updatedStock = data.map(item => item.id === id ? { ...item, stock: newStock } : item);

    setUpdatedStock(updatedStock);
  }


  async function handleOnSubmit() {
    console.log("updatedStock", updatedStock);
    if (updatedStock) {
      const response = await fetch(`${API_LOC}:${PORT}/api/paints/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paint: updatedStock }),
      });

      if (!response.ok) {
        console.log('Failed to update stock');
      }

      // Return the updated data
      navigate('/');
    }

    //TODO submitting no changes
    console.log('There are no changes to submit');
  }

  // state management from query
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="stock-box">
        <h3>Admin Panel</h3>
        {data.map((item) => (
          <UserBox
            key={item.id}
            item={item}
            onUserChange={handleGeneralUserChange}
          />
          // <div key={item.id}>

          //   <p>Username: {item.userName}</p>
          //   <p>First Name: {item.firstName}</p>
          //   <p>Last Name: {item.lastName}</p>
          //   <p>Role: {item.role}</p>
          //   <p>Enabled: {item.enabled ? 'true' : 'false'}</p>
          // </div>
        ))}
      </div>
      <button onClick={handleOnSubmit}>Update Users</button>
    </>
  );
}

export default Admin;