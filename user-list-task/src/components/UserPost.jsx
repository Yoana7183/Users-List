import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useManageUserPostAPI_request from '../hooks/useManageUserPostAPI_request';
/**
 * UserPost component displays a user post and allows editing and deletion.
 *
 * This component takes a `post` object as a prop, which represents the user's post.
 * It provides functionality for editing the post's title and body, deleting the post,
 * and reverting changes. It also includes validation for user input.
 *
 * @component
 * @param {Object} post - The user's post object.
 * @param {string} post.title - The title of the post.
 * @param {string} post.body - The body of the post.
 * @returns {JSX.Element} The UserPost component.
 */
const UserPost = ({ post }) => {
  const { deleteUserPost, updateUserPost } = useManageUserPostAPI_request();
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({
    title: post.title,
    body: post.body,
  });
  const [error, setError] = useState({
    title: '',
    body: '',
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
    const inputValue = e.target.value;

    if (inputValue.length >= 5) {
      setEditedPost({ ...editedPost, [type]: inputValue });
      setError({ ...error, [type]: '' });
    } else {
      setEditedPost({ ...editedPost, [type]: inputValue });

      if (inputValue.length === 0) {
        setError({ ...error, [type]: 'The field cannot be empty!' });
      } else {
        setError({
          ...error,
          [type]: 'The edited text must contain at least 5 characters.',
        });
      }
    }
  };

  const buttonsStyle = `text-gray-600 text-lg mx-5 my-5 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300 transition duration-300`;
  return (
    <section
      className={`p-5 rounded mb-4 bg-white ${
        isEditing
          ? 'border border-teal-500 shadow-lg'
          : 'border border-grey-50 shadow-lg'
      }`}
    >
      <div className="text-lg font-semibold mb-2">Title: {post.title}</div>
      {isEditing ? (
        <div className="flex flex-col">
          {error.title && <div className="text-rose-800">{error.title}</div>}
          <textarea
            value={editedPost.title}
            onChange={(e) => {
              validateEdittingField(e, 'title');
            }}
            className="border border-gray-400 rounded p-2 mb-2 w-full md:w-[75%]"
            placeholder="Edit Title"
          />
          {error.body && <div className="text-rose-800">{error.body}</div>}
          <textarea
            value={editedPost.body}
            onChange={(e) => {
              validateEdittingField(e, 'body');
            }}
            className="border border-gray-400 rounded p-2 mb-2 w-full md:w-[75%]"
            placeholder="Edit Body"
          />

          <button
            onClick={handleSave}
            className={`${buttonsStyle} w-[150px] ${
              !Object.keys(error).some((key) => error[key] !== '')
                ? 'hover:text-teal-700 bg-teal-100 text-teal-800 hover:bg-teal-200 hover:border-teal-800 border-teal-100 border-2 px-2 py-2 rounded-md transition duration-300'
                : 'cursor-not-allowed bg-gray-300 text-gray-600 hover:bg-gray-400 hover:border-gray-800 hover:text-gray-800 px-2 py-2 rounded-md '
            }`}
            disabled={Object.values(error).some((error) => error !== '')}
          >
            SAVE CHANGES
          </button>
        </div>
      ) : (
        <div className="text-gray-700">{post.body}</div>
      )}

      <button
        onClick={isEditing ? handleCancelEdit : handleEdit}
        className={`${buttonsStyle} hover:text-indigo-800 ${
          isEditing
            ? 'bg-teal-100 text-teal-800 hover:bg-teal-200 hover:border-teal-800 border-teal-100 border-2 px-4 py-2 rounded-md transition duration-300'
            : 'bg-teal-100 text-teal-800 hover:bg-teal-200 hover:border-teal-800 border-teal-100 border-2 px-4 py-2 rounded-md transition duration-300'
        }`}
      >
        {isEditing ? 'REVERT' : 'EDIT'}
      </button>

      <button
        onClick={handleDelete}
        className={`${buttonsStyle} hover:text-rose-800 bg-rose-200 border-2 px-4 py-2 rounded-md transition duration-300`}
      >
        DELETE
      </button>
    </section>
  );
};

UserPost.propTypes = {
  post: PropTypes.object.isRequired,
};

export default UserPost;
