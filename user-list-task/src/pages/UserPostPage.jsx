import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserList from '../components/UserList';
import { UserListContext } from '../context/UserListContextProvider';

function findUserById(users, userId) {
  return users.filter((user) => user.id == userId);
}

const UserPostPage = () => {
  const { firstTenUsers } = useContext(UserListContext);
  const { userId } = useParams();
  const currenUser = findUserById(firstTenUsers, userId);

  return (
    <div>
      {currenUser && <UserList user={currenUser[0]} isFromPost={true} />}
    </div>
  );
};

export default UserPostPage;

UserPostPage.propTypes = {
  userId: PropTypes.string,
};
