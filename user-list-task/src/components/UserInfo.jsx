import React from 'react';
import PropTypes from 'prop-types';
import ValidateUserListInputs from '../hooks/ValidateUserListInputs';

/**
 * UserInfo component displays user information and handles user data editing.
 *
 * This component renders user information,
 * an input field for editing the data, and optional validation error messages.
 * It allows editing of user data and updates the `editedUser` state when changes are made.
 * If `nestedProp` is provided, it updates the nested property; otherwise, it updates
 * the property directly.
 *
 * @component
 * @param {string} title - The title of the user information field (e.g., 'Username').
 * @param {string} propToValidate - The property name to validate (e.g., 'username', 'email').
 * @param {string} [nestedProp] - The nested property name (if applicable).
 * @param {any} value - The current value of the input field.
 * @param {object} editedUser - The user object being edited.
 * @param {function} setEditedUser - A function to update the edited user object.
 * @param {string} [validationErrors] - Validation error message for the input field.
 * @param {function} [setValidationErrors] - A function to update validation errors.
 * @returns {JSX.Element} The rendered UserInfo component.
 */
const UserInfo = ({
  title,
  propToValidate,
  nestedProp,
  value,
  editedUser,
  setEditedUser,
  validationErrors,
  setValidationErrors,
}) => {
  return (
    <div className="mx-2 my-3 flex flex-col sm:flex-row ">
      <ValidateUserListInputs
        type={nestedProp ? `${nestedProp}` : propToValidate}
        value={editedUser[propToValidate]}
        setValidationErrors={setValidationErrors}
      />
      <strong className="my-2 font-medium text-gray-500 uppercase tracking-wider">
        {title}:
      </strong>
      <input
        type="text"
        className="border rounded p-1 mt-[-5px] mx-2"
        value={value}
        onChange={(e) =>
          setEditedUser((prevEditedUser) => {
            if (nestedProp) {
              // If nestedProp is provided, update the nested property
              const updatedUser = {
                ...prevEditedUser,
                [propToValidate]: {
                  ...prevEditedUser[propToValidate],
                  [nestedProp]: e.target.value,
                },
              };
              return updatedUser;
            } else {
              // If nestedProp is not provided, update the property directly
              const updatedUser = {
                ...editedUser,
                [propToValidate]: e.target.value,
              };
              return updatedUser;
            }
          })
        }
      />
      {validationErrors && (
        <div className="text-red-500">{validationErrors}</div>
      )}
    </div>
  );
};

export default UserInfo;
UserInfo.propTypes = {
  title: PropTypes.string.isRequired,
  propToValidate: PropTypes.string.isRequired,
  nestedProp: PropTypes.string,
  value: PropTypes.any,
  editedUser: PropTypes.object.isRequired,
  setEditedUser: PropTypes.func.isRequired,
  validationErrors: PropTypes.string,
  setValidationErrors: PropTypes.func,
};
