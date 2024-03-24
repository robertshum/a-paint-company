import { useQuery } from 'react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserBox from '../components/UserBox';

const API_LOC = import.meta.env.VITE_API_LOCATION;
const PORT = import.meta.env.VITE_API_PORT;

function Admin() {

  const navigate = useNavigate();
  const [users, updateUsers] = useState([]);

  // Get Users
  const { data, isLoading, error } = useQuery('users', async () => {
    const response = await fetch(`${API_LOC}:${PORT}/api/users`);
    if (!response.ok) {
      console.log('Network response was not ok');
    }

    return response.json();
  });

  function handleRoleChange(id, newRole) {
    const updatedUsers = data.map(currentUser => currentUser.id === id ? { ...currentUser, role: newRole } : currentUser);
    updateUsers(updatedUsers);
  }

  function handleEnableChange(id, isEnabled) {
    const updatedUsers = data.map(currentUser => currentUser.id === id ? { ...currentUser, enabled: Boolean(isEnabled) } : currentUser);
    console.log("users", updatedUsers);
    updateUsers(updatedUsers);
  }

  // Persist changes to users
  async function handleOnSubmit() {
    if (users) {
      console.log('Upcoming changes, ', users);
      const response = await fetch(`${API_LOC}:${PORT}/api/users/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ users: users }),
      });

      if (!response.ok) {
        console.log('Failed to update stock');
      }

      // Return the updated data
      return navigate('/');
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

            handleRoleChange={handleRoleChange}
            handleEnableChange={handleEnableChange}
          />
        ))}
      </div>
      <button onClick={handleOnSubmit}>Update Users</button>
    </>
  );
}

export default Admin;