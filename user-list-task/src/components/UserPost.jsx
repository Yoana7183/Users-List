import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useManageUserPostAPI_request from '../hooks/useManageUserPostAPI_request';

const UserPost = ({ post }) => {
  const { deleteUserPost, updateUserPost } = useManageUserPostAPI_request();
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({
    title: post.title,
    body: post.body,
  });

  const handleDelete = () => {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this post?'
    );

    if (shouldDelete) {
      deleteUserPost(post.id);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateUserPost(post.id, editedPost);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedPost({ title: post.title, body: post.body });
    setIsEditing(false);
  };

  return (
    <div className="border border-gray-300 p-4 rounded shadow-md mb-4">
      <div className="text-lg font-semibold mb-2">
        Post: {post.id} - {post.title}
      </div>
      {isEditing ? (
        <div>
          <textarea
            value={editedPost.title}
            onChange={(e) =>
              setEditedPost({ ...editedPost, title: e.target.value })
            }
            className="border border-gray-400 rounded p-2 mb-2 w-full"
            placeholder="Edit Title"
          />
          <textarea
            value={editedPost.body}
            onChange={(e) =>
              setEditedPost({ ...editedPost, body: e.target.value })
            }
            className="border border-gray-400 rounded p-2 mb-2 w-full"
            placeholder="Edit Body"
          />
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none mr-2"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="text-gray-700">{post.body}</div>
      )}
      <button
        onClick={isEditing ? handleCancelEdit : handleEdit}
        className={`mt-2 px-4 py-2 ${
          isEditing ? 'bg-gray-500' : 'bg-blue-500'
        } text-white rounded hover:bg-blue-600 focus:outline-none mr-2`}
      >
        {isEditing ? 'Revert' : 'Edit'}
      </button>
      <button
        onClick={handleDelete}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
      >
        Delete
      </button>
    </div>
  );
};

UserPost.propTypes = {
  post: PropTypes.object.isRequired,
};

export default UserPost;
