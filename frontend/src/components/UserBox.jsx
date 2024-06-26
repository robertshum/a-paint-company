import { useState } from 'react';
import './components.css';

function UserBox(props) {

  const user = props.item;

  // unique id's for the forms and labels
  const enabledId = user.id + "enabled-id";
  const roleId = user.id + "role-id";

  // Initialize state for the checkbox value
  const [isChecked, setIsChecked] = useState(Boolean(user.enabled));

  // Define state for the selected role
  const [selectedRole, setSelectedRole] = useState(user.role || 'View');

  function handleEnabledChange() {

    // Toggle the value of isChecked when the checkbox is clicked
    setIsChecked(prevCheck => !prevCheck);

    // update the user in the parent
    props.handleEnableChange(user.id, !isChecked);
  };

  function handleRoleChange(newRole) {

    // Change the value of role when there is a new selection
    setSelectedRole(newRole);

    // update the user in the parent
    props.handleRoleChange(user.id, newRole);
  }

  return (
    <>
      <div className="user-stock" key={user.id}>
        <h4>Username: {user.userName}</h4>
        <p>First Name: {user.firstName}</p>
        <p>Last Name: {user.lastName}</p>

        {/* Selection box for roles */}
        <span className='inline'>
          <label htmlFor={roleId}>Role:</label>
          <select name="role" id={roleId}
            value={selectedRole}
            onChange={(e) => handleRoleChange(e.target.value)}>
            <option value="Admin">Admin</option>
            <option value="Painter">Painter</option>
            <option value="View">View</option>
            <option value="PaintAdmin">PaintAdmin</option>
          </select>
        </span >

        {/* Checkbox for enabled/disabled */}
        <span className='inline'>
          <label htmlFor={enabledId}>Enabled:</label>
          <input id={enabledId} type="checkbox"
            checked={Boolean(isChecked)}
            onChange={handleEnabledChange} />
        </span >
      </div >
    </>
  );
}

export default UserBox;