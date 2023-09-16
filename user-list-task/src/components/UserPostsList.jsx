import React, { useContext } from 'react';
import { UserListContext } from '../context/UserListContextProvider';
import UserPost from './UserPost';
const UserPostsList = () => {
  const { userPosts } = useContext(UserListContext);
  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">User Posts</h2>
      {userPosts.length > 0 ? (
        <ul className="space-y-4">
          {userPosts.map((post) => (
            <li key={post.id} className="bg-white border rounded shadow-md p-4">
              <UserPost post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No posts available.</p>
      )}
    </div>
  );
};

export default UserPostsList;
