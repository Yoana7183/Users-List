import React from 'react';
import PropTypes from 'prop-types';
import ValidateUserListInputs from '../hooks/ValidateUserListInputs';
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
    <>
      <ValidateUserListInputs
        type={nestedProp ? `${nestedProp}` : propToValidate}
        value={editedUser[propToValidate]}
        setValidationErrors={setValidationErrors}
      />
      <strong>{title}:</strong>
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
    </>
  );
};

export default UserInfo;
UserInfo.propTypes = {
  title: PropTypes.string.isRequired,
  propToValidate: PropTypes.string.isRequired,
  nestedProp: PropTypes.string,
  value: PropTypes.any,
  editedUser: PropTypes.any.isRequired,
  setEditedUser: PropTypes.func.isRequired,
  validationErrors: PropTypes.any,
  setValidationErrors: PropTypes.func,
};
