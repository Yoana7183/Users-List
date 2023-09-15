import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserInfo from './UserInfo';
import useManageUsers from '../hooks/useManageUsers';
const UserList = ({ user }) => {
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    ...user,
  });
  const { updateUserPersonalData } = useManageUsers();
  const [validationErrors, setValidationErrors] = useState({});

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    // Implement your save logic here
    // Validate input fields before saving
    const errors = {};
    if (!editedUser.username) {
      errors.username = 'Username is required';
    }
    if (!editedUser.email) {
      errors.email = 'Email is required';
    }
    if (!editedUser.address.street) {
      errors.street = 'Street is required';
    }
    if (!editedUser.address.suite) {
      errors.suite = 'Suite is required';
    }
    if (!editedUser.address.city) {
      errors.city = 'City is required';
    }

    if (Object.keys(errors).length === 0) {
      // No errors, save the user
      setValidationErrors({});
      setEditing(false);
      updateUserPersonalData(user.id, editedUser);
    } else {
      // Errors found, display validation errors
      setValidationErrors(errors);
    }
  };

  const handleCancelClick = () => {
    setEditing(false);
    setEditedUser({ ...user });
    setValidationErrors({});
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <div className="flex justify-between items-center">
        <h3>{user.name}</h3>
        <button onClick={handleEditClick} className="text-blue-500 underline">
          {editing ? '' : 'Edit'}
        </button>
      </div>
      {editing ? (
        <>
          <div>
            <strong>Name:</strong> {user.name}
          </div>
          <div>
            <UserInfo
              title={'Username'}
              propToValidate={'username'}
              value={editedUser.username}
              editedUser={editedUser}
              setEditedUser={setEditedUser}
              validationErrors={validationErrors.username}
            />
            <UserInfo
              title={'Email'}
              propToValidate={'email'}
              value={editedUser.email}
              editedUser={editedUser}
              setEditedUser={setEditedUser}
              validationErrors={validationErrors.email}
            />
            <UserInfo
              title={'Address'}
              propToValidate={'address'}
              nestedProp={'street'}
              value={editedUser.address.street}
              editedUser={editedUser}
              setEditedUser={setEditedUser}
              validationErrors={validationErrors.street}
            />
            <UserInfo
              title={'Address suite'}
              propToValidate={'address'}
              nestedProp={'suite'}
              value={editedUser.address.suite}
              editedUser={editedUser}
              setEditedUser={setEditedUser}
              validationErrors={validationErrors.suite}
            />
            <UserInfo
              title={'Address city'}
              propToValidate={'address'}
              nestedProp={'city'}
              value={editedUser.address.city}
              editedUser={editedUser}
              setEditedUser={setEditedUser}
              validationErrors={validationErrors.city}
            />
          </div>

          <button
            onClick={handleSaveClick}
            className={`bg-blue-500 text-white rounded p-2 ${
              !Object.keys(validationErrors).length ? '' : 'cursor-not-allowed'
            }`}
            disabled={Object.keys(validationErrors).length > 0}
          >
            Save
          </button>
          <button onClick={handleCancelClick} className="ml-2 text-grey-500">
            Revert
          </button>
        </>
      ) : (
        <>
          <div>
            <strong>Username:</strong> {user.username}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Street:</strong> {user.address.street}
          </div>
          <div>
            <strong>Suite:</strong> {user.address.suite}
          </div>
          <div>
            <strong>City:</strong> {user.address.city}
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;

UserList.propTypes = {
  user: PropTypes.object,
};
