import React, { useContext } from 'react';
import { UserListContext } from '../context/UserListContextProvider';
import UserPost from './UserPost';
import NoMoreRecords from './NoMoreRecords';
const UserPostsList = () => {
  const { userPosts } = useContext(UserListContext);
  return (
    <div className=" p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 flex justify-center text-gray-600">
        User Posts
      </h2>
      {userPosts.length || userPosts === undefined ? (
        <ul className="space-y-4">
          {userPosts.map((post) => (
            <li key={post.id} className="bg-white border rounded shadow-md p-4">
              <UserPost post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <NoMoreRecords text={'No more posts available.'} />
      )}
    </div>
  );
};

export default UserPostsList;
