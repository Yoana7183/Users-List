import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserList from '../components/UserList';
const UserPostPage = () => {
  const { user } = useParams();
  console.log(user);
  return <div>{user && <UserList user={user} />}</div>;
};

export default UserPostPage;
UserPostPage.propTypes = {
  userId: PropTypes.object,
};
