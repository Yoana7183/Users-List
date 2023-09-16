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
  const validateEdittingField = (e, type) => {
    if (e.target.value.length == 0) {
      return;
    }
    setEditedPost({ ...editedPost, [type]: e.target.value });
  };
  const buttonsStyle = `text-gray-600 text-lg mx-5 my-5 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300 transition duration-300`;
  return (
    <div className="">
      <div className="text-lg font-semibold mb-2">Title: {post.title}</div>
      {isEditing ? (
        <div>
          <textarea
            value={editedPost.title}
            onChange={(e) => {
              validateEdittingField(e, 'title');
            }}
            className="border border-gray-400 rounded p-2 mb-2 w-full"
            placeholder="Edit Title"
          />
          <textarea
            value={editedPost.body}
            onChange={(e) => {
              validateEdittingField(e, 'body');
            }}
            className="border border-gray-400 rounded p-2 mb-2 w-full"
            placeholder="Edit Body"
          />
          <button onClick={handleSave} className={buttonsStyle}>
            SAVE CHANGES
          </button>
        </div>
      ) : (
        <div className="text-gray-700">{post.body}</div>
      )}
      <button
        onClick={isEditing ? handleCancelEdit : handleEdit}
        className={buttonsStyle}
      >
        {isEditing ? 'REVERT' : 'EDIT'}
      </button>
      <button onClick={handleDelete} className={buttonsStyle}>
        DELETE
      </button>
    </div>
  );
};

UserPost.propTypes = {
  post: PropTypes.object.isRequired,
};

export default UserPost;
