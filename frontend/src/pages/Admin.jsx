import { useQuery } from 'react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserBox from '../components/UserBox';
import config from '../common/config';

function Admin() {

  const navigate = useNavigate();
  const [users, updateUsers] = useState([]);

  // Get Users
  const { data, isLoading, error } = useQuery('users', async () => {
    const response = await fetch(`${config.getPaintApiEndpoint()}/api/users`);
    if (!response.ok) {
      console.log('Network response was not ok');
    }

    const responseData = await response.json();
    updateUsers(responseData || []);
    return responseData;
  }, {
    // don't cache the response, refresh frequently or else it might load stale data
    staleTime: 2000,
    cacheTime: 0,
  });

  function handleRoleChange(id, newRole) {
    updateUsers(previousUsers => {
      return previousUsers.map(user => {
        if (user.id === id) {
          return { ...user, role: newRole, enabled: user.enabled };
        }
        return user;
      });
    });
  }

  function handleEnableChange(id, isEnabled) {
    console.log("isenabled, ", isEnabled);
    updateUsers(previousUSers => {
      return previousUSers.map(user => {
        if (user.id === id) {
          return { ...user, enabled: isEnabled, role: user.role };
        }
        return user;
      });
    });
  }

  // Persist changes to users
  async function handleOnSubmit() {
    if (users.length > 0) {
      const response = await fetch(`${config.getPaintApiEndpoint()}/api/users/`, {
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