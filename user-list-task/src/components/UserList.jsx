import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserInfo from './UserInfo';
import useManageUsersListAPI_request from '../hooks/useManageUsersListAPI_request';
import UserInformationContainer from './UserInformationContainer';
/**
 * UserList component displays user information and allows editing user data.
 *
 * This component takes a `user` object as a prop, which represents user information.
 * It provides functionality for editing user details, saving changes, reverting changes,
 * and viewing user posts. It also handles validation of user input and displays validation errors.
 *
 * @component
 * @param {Object} user - The user data.
 * @param {string} user.id - The user's unique identifier.
 * @param {string} user.username - The user's username.
 * @param {string} user.email - The user's email address.
 * @param {Object} user.address - The user's address information.
 * @param {string} user.address.street - The street address.
 * @param {string} user.address.suite - The suite/apartment number.
 * @param {string} user.address.city - The city name.
 * @param {boolean} isFromPost - Indicates if the component is used in the context of user posts.
 * @returns {JSX.Element} The UserList component.
 */
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
  const buttonsStyle = `text-gray-600 text-lg mx-4 my-1 py-2 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300 transition duration-300`;

  return (
    <div
      className={`${
        editing
          ? 'border-2 border-teal-500 shadow-2xl'
          : 'border border-gray-300 shadow-sm'
      } p-2 rounded mb-4 bg-white w-[]`}
    >
      <div className="flex justify-end mb-5">
        {!editing && (
          <button
            onClick={handleEditClick}
            className={`${buttonsStyle} hover:text-teal-800 focus:outline-none bg-teal-100 text-teal-800 hover:bg-teal-200 hover:border-teal-800 border-teal-100 border-2 px-4 py-2 rounded-md transition duration-300`}
          >
            EDIT
          </button>
        )}
      </div>

      {editing ? (
        <>
          <div className="flex p-6 flex-col">
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
            className={`${buttonsStyle}  ${
              !Object.keys(validationErrors).some(
                (key) => validationErrors[key] !== ''
              )
                ? 'hover:text-teal-700 bg-teal-100 text-teal-800 hover:bg-teal-200 hover:bg-opacity-80 hover:border-teal-800 border-teal-100 border-2 px-4 py-2 rounded-md transition duration-300'
                : 'cursor-not-allowed bg-gray-300 text-gray-600 hover:bg-gray-400 hover:border-gray-800 hover:text-gray-800 border-2 px-4 py-2 rounded-md transition duration-300'
            } mb-5`}
            disabled={Object.values(validationErrors).some(
              (error) => error !== ''
            )}
          >
            SAVE
          </button>

          <button
            onClick={handleCancelClick}
            className={`${buttonsStyle}  border-rose-100 border-2 hover:text-rose-500 hover:bg-red-200 p-5 rounded-md`}
          >
            REVERT
          </button>
        </>
      ) : (
        <UserInformationContainer userContainerInfo={user} />
      )}
      {!isFromPost && !editing && (
        <NavLink to={`user/posts/${user.id}`}>
          <button
            className={`${buttonsStyle} hover:text-teal-800 focus:outline-none bg-teal-100 text-teal-800 hover:bg-teal-200 hover:border-teal-800 border-teal-100 border-2 px-4 py-2 rounded-md transition duration-300`}
          >
            View Post
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
