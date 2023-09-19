import React from 'react';
import PropTypes from 'prop-types';

/**
 * UserInformationContainer component displays user information.
 *
 * This component renders user information including name, username, email, street,
 * suite, and city if available in the `userContainerInfo` prop.
 *
 * @component
 * @param {object} userContainerInfo - The user information object to display.
 * @returns {JSX.Element} The rendered UserInformationContainer component.
 */
const UserInformationContainer = ({ userContainerInfo }) => {
  if (userContainerInfo == undefined) {
    return;
  }
  const titleStyle = `font-medium text-gray-500 uppercase tracking-wider pr-2`;
  return (
    <section className="flex flex-row">
      <div className="w-full px-4 mb-4">
        <div className="bg-white shadow-md rounded-md p-4">
          <div className=" flex mb-2">
            <strong className={titleStyle}>Name:</strong>
            <p> {userContainerInfo.name}</p>
          </div>
          {userContainerInfo.username && (
            <div className="mb-2 flex">
              <strong className={titleStyle}>Username:</strong>
              <p>{userContainerInfo.username}</p>
            </div>
          )}
          {userContainerInfo.email && (
            <div className="mb-2 flex">
              <strong className={titleStyle}>Email:</strong>
              <p> {userContainerInfo.email}</p>
            </div>
          )}
          {userContainerInfo.address && userContainerInfo.address.street && (
            <div className="mb-2 flex">
              <strong className={titleStyle}>Street:</strong>
              <p> {userContainerInfo.address.street}</p>
            </div>
          )}
          {userContainerInfo.address && userContainerInfo.address.suite && (
            <div className="mb-2 flex">
              <strong className={titleStyle}>Suite:</strong>
              <p> {userContainerInfo.address.suite}</p>
            </div>
          )}
          {userContainerInfo.address && userContainerInfo.address.city && (
            <div className="mb-2 flex">
              <strong className={titleStyle}>City:</strong>{' '}
              <p> {userContainerInfo.address.city}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
UserInformationContainer.propTypes = {
  userContainerInfo: PropTypes.object,
};

export default UserInformationContainer;
