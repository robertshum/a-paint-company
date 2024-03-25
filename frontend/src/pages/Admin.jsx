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
  }, {
    // don't cache the response, refresh frequently or else it might load stale data
    staleTime: 2000,
    cacheTime: 0,
  });

  // update state of the users based on the role
  function handleRoleChange(id, newRole) {
    const updatedUsers = data.map(currentUser => currentUser.id === id ? { ...currentUser, role: newRole } : currentUser);
    updateUsers(updatedUsers);
  }

  // update state of the users based on the updated enabled/disabled status
  function handleEnableChange(id, isEnabled) {
    const updatedUsers = data.map(currentUser => currentUser.id === id ? { ...currentUser, enabled: Boolean(isEnabled) } : currentUser);
    updateUsers(updatedUsers);
  }

  // Persist changes to users
  async function handleOnSubmit() {
    if (users && users.length !== 0) {
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

      // Return back home
      return navigate('/');
    }

    //submitting no changes
    console.log('There are no changes to submit');
  }

  // state management from query
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {/* Admin Panel to modify roles/enabled/disabled */}
      <section className="kanban-section">
        <h3 className="headers">Admin Panel</h3>
        <div className="stock-box">
          {data.map((item) => (
            <UserBox
              key={item.id}
              item={item}
              handleRoleChange={handleRoleChange}
              handleEnableChange={handleEnableChange}
            />
          ))}
        </div>
      </section>
      <button onClick={handleOnSubmit}>Update Users</button>
    </>
  );
}

export default Admin;