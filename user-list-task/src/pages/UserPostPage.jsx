import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserList from '../components/UserList';
import { UserListContext } from '../context/UserListContextProvider';
import useManageUserPostAPI_request from '../hooks/useManageUserPostAPI_request.js';
import UserPostsList from '../components/UserPostsList';
function findUserById(users, userId) {
  if (!users) {
    return;
  }
  return users.filter((user) => user.id == userId);
}

const UserPostPage = () => {
  const { firstTenUsers } = useContext(UserListContext);
  const { getUserPostById } = useManageUserPostAPI_request();
  const { userId } = useParams();
  const currentUser = findUserById(firstTenUsers, userId);
  useEffect(() => {
    getUserPostById(userId);
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <section className="">
      {currentUser && <UserList user={currentUser[0]} isFromPost={true} />}
      {currentUser && <UserPostsList />}
    </section>
  );
};

export default UserPostPage;
