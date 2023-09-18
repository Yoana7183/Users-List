import React, { useContext } from 'react';
import { UserListContext } from '../context/UserListContextProvider';
import UserPost from './UserPost';
import NoMoreRecords from './NoMoreRecords';
/**
 * UserPostsList component displays a list of user posts.
 *
 * This component retrieves the user posts data from the UserListContext and renders a list
 * of UserPost components for each post. If there are no user posts available, it displays a message
 * using the NoMoreRecords component.
 *
 * @component
 * @returns {JSX.Element} The UserPostsList component.
 */
const UserPostsList = () => {
  const { userPosts } = useContext(UserListContext);
  return (
    <section className=" p-4 ">
      <h2 className="text-2xl font-bold mb-4 flex justify-center text-gray-600">
        User Posts
      </h2>
      {userPosts.length || userPosts === undefined ? (
        <ul className="space-y-4 mx-2 sm:mx-16 md:mx-24">
          {userPosts.map((post) => (
            <li key={post.id} className=" p-2">
              <UserPost post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <NoMoreRecords text={'No more posts available.'} />
      )}
    </section>
  );
};

export default UserPostsList;
