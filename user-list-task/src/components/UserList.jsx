import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserInfo from './UserInfo';
import useManageUsersListAPI_request from '../hooks/useManageUsersListAPI_request';
import UserInformationContainer from './UserInformationContainer';
const UserList = ({ user, isFromPost }) => {
  const [editing, setEditing] = useState(false);

  const [editedUser, setEditedUser] = useState({
    ...user,
  });

  const { updateUserPersonalData } = useManageUsersListAPI_request();
  const [validationErrors, setValidationErrors] = useState({});

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
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
  const buttonsStyle = `text-gray-600 text-lg mx-5 my-5 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300 transition duration-300`;
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <div className="flex justify-end mb-5">
        <button onClick={handleEditClick} className={buttonsStyle}>
          {editing ? '' : 'EDIT'}
        </button>
      </div>

      {editing ? (
        <>
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
            className={` ${buttonsStyle} ${
              !Object.keys(validationErrors).length ? '' : 'cursor-not-allowed'
            }`}
            disabled={Object.keys(validationErrors).length > 0}
          >
            SAVE
          </button>
          <button onClick={handleCancelClick} className={buttonsStyle}>
            REVERT
          </button>
        </>
      ) : (
        <UserInformationContainer userContainerInfo={user} />
      )}
      {!isFromPost && !editing && (
        <NavLink to={`user/posts/${user.id}`}>
          <button className={buttonsStyle}>See Post</button>
        </NavLink>
      )}
    </div>
  );
};

export default UserList;

UserList.propTypes = {
  user: PropTypes.any,
  isFromPost: PropTypes.bool,
};
