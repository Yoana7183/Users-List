import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserList from '../components/UserList';
import { UserListContext } from '../context/UserListContextProvider';
import useManageUserPostAPI_request from '../hooks/useManageUserPostAPI_request.js';
import UserPostsList from '../components/UserPostsList';
/**
 * UserPostPage component displays user-specific information and their posts.
 *
 * This component fetches user data and user posts based on the provided userId from the route parameters.
 *
 * @component
 * @returns {JSX.Element} The UserPostPage component.
 */
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
  /**
   * Finds a user by their ID within the provided array of users.
   *
   * @param {Array} users - The array of user data.
   * @param {string} userId - The ID of the user to find.
   * @returns {object|null} The user object if found, or undefined if not found.
   */
  return (
    <section className="">
      {currentUser && <UserList user={currentUser[0]} isFromPost={true} />}
      {currentUser && <UserPostsList />}
    </section>
  );
};

export default UserPostPage;
