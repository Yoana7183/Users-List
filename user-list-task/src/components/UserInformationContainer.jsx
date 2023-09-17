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
  return (
    <section className="flex flex-row">
      <div className="w-full px-4 mb-4">
        <div className="bg-white shadow-md rounded-md p-4">
          <div>
            <strong>Name:</strong> {userContainerInfo.name}
          </div>
          {userContainerInfo.username && (
            <div className="mb-2">
              <strong className="text-gray-700">Username:</strong>{' '}
              {userContainerInfo.username}
            </div>
          )}
          {userContainerInfo.email && (
            <div className="mb-2">
              <strong className="text-gray-700">Email:</strong>{' '}
              {userContainerInfo.email}
            </div>
          )}
          {userContainerInfo.address && userContainerInfo.address.street && (
            <div className="mb-2">
              <strong className="text-gray-700">Street:</strong>{' '}
              {userContainerInfo.address.street}
            </div>
          )}
          {userContainerInfo.address && userContainerInfo.address.suite && (
            <div className="mb-2">
              <strong className="text-gray-700">Suite:</strong>{' '}
              {userContainerInfo.address.suite}
            </div>
          )}
          {userContainerInfo.address && userContainerInfo.address.city && (
            <div className="mb-2">
              <strong className="text-gray-700">City:</strong>{' '}
              {userContainerInfo.address.city}
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
