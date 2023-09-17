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
  const [validationErrors, setValidationErrors] = useState({
    username: '',
    email: '',
    street: '',
    suite: '',
    city: '',
  });

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== ''
    );

    if (!hasErrors) {
      // No errors, save the user
      setValidationErrors({});
      setEditing(false);
      updateUserPersonalData(user.id, editedUser);
    }
  };

  const handleCancelClick = () => {
    setEditing(false);
    setEditedUser({ ...user });
    setValidationErrors({});
  };
  const buttonsStyle = `text-gray-600 text-lg mx-5 my-3 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300 transition duration-300`;

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <div className="flex justify-end mb-5">
        <button onClick={handleEditClick} className={buttonsStyle}>
          {editing ? '' : 'EDIT'}
        </button>
      </div>

      {editing ? (
        <>
          <div className="flex md:flex-row md:flex-wrap flex-col">
            <UserInfo
              title={'Username'}
              propToValidate={'username'}
              value={editedUser.username}
              editedUser={editedUser}
              setEditedUser={setEditedUser}
              validationErrors={validationErrors.username}
              setValidationErrors={setValidationErrors}
            />
            <UserInfo
              title={'Email'}
              propToValidate={'email'}
              value={editedUser.email}
              editedUser={editedUser}
              setEditedUser={setEditedUser}
              validationErrors={validationErrors.email}
              setValidationErrors={setValidationErrors}
            />
            <UserInfo
              title={'Address'}
              propToValidate={'address'}
              nestedProp={'street'}
              value={editedUser.address.street}
              editedUser={editedUser}
              setEditedUser={setEditedUser}
              validationErrors={validationErrors.street}
              setValidationErrors={setValidationErrors}
            />
            <UserInfo
              title={'Address suite'}
              propToValidate={'address'}
              nestedProp={'suite'}
              value={editedUser.address.suite}
              editedUser={editedUser}
              setEditedUser={setEditedUser}
              validationErrors={validationErrors.suite}
              setValidationErrors={setValidationErrors}
            />
            <UserInfo
              title={'Address city'}
              propToValidate={'address'}
              nestedProp={'city'}
              value={editedUser.address.city}
              editedUser={editedUser}
              setEditedUser={setEditedUser}
              validationErrors={validationErrors.city}
              setValidationErrors={setValidationErrors}
            />
          </div>

          <button
            onClick={handleSaveClick}
            className={`${buttonsStyle} ${
              !Object.keys(validationErrors).some(
                (key) => validationErrors[key] !== ''
              )
                ? 'hover:text-teal-700'
                : 'cursor-not-allowed hover:text-rose-800'
            }`}
            disabled={Object.values(validationErrors).some(
              (error) => error !== ''
            )}
          >
            SAVE
          </button>

          <button
            onClick={handleCancelClick}
            className={`${buttonsStyle} hover:text-rose-800`}
          >
            REVERT
          </button>
        </>
      ) : (
        <UserInformationContainer userContainerInfo={user} />
      )}
      {!isFromPost && !editing && (
        <NavLink to={`user/posts/${user.id}`}>
          <button className={`${buttonsStyle} hover:text-indigo-800`}>
            See Post
          </button>
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
