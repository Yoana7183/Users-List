import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useManageUserPostAPI_request from '../hooks/useManageUserPostAPI_request';
import DeleteConfirmationModal from './DeleteConfirmationModal';

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({
    title: post.title,
    body: post.body,
  });
  const [error, setError] = useState({
    title: '',
    body: '',
  });
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    openDeleteModal();
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
      <div className="sm:text-lg text-xs mb-2 text-centerfont-medium text-gray-500 uppercase tracking-wider flex">
        ID: <p className="pl-2 text-gray-800">{post.id}</p>
      </div>
      <div className="sm:text-lg text-xs mb-2 text-centerfont-medium text-gray-500 uppercase tracking-wider flex">
        Title: <p className="pl-2 text-gray-800">{post.title}</p>
      </div>
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
                ? 'hover:text-teal-700 bg-teal-100 text-teal-800 hover:bg-teal-200 hover:border-teal-800 border-teal-100 border-2sm:px-4 px-3 sm:py-2  rounded-md transition duration-300'
                : 'cursor-not-allowed bg-gray-300 text-gray-600 hover:bg-gray-400 hover:border-gray-800 hover:text-gray-800sm:px-4 px-3 sm:py-2  rounded-md '
            }`}
            disabled={Object.values(error).some((error) => error !== '')}
          >
            SAVE CHANGES
          </button>
        </div>
      ) : (
        <div className="sm:text-lg text-xs  mb-2 text-centerfont-medium text-gray-500 uppercase tracking-wider flex">
          Post: <p className="pl-2 text-gray-800 normal-case">{post.body}</p>
        </div>
      )}

      <button
        onClick={isEditing ? handleCancelEdit : handleEdit}
        className={`${buttonsStyle} hover:text-indigo-800 ${
          isEditing
            ? 'bg-teal-100 text-teal-800 hover:bg-teal-200 hover:border-teal-800 border-teal-100 border-2 sm:px-4 px-3 sm:py-2 rounded-md transition duration-300'
            : 'bg-teal-100 text-teal-800 hover:bg-teal-200 hover:border-teal-800 border-teal-100 border-2 sm:px-4 px-3  sm:py-2 rounded-md transition duration-300'
        }`}
      >
        {isEditing ? 'REVERT' : 'EDIT'}
      </button>

      <button
        onClick={handleDelete}
        className={`${buttonsStyle} hover:text-rose-800 bg-rose-200 border-2 sm:px-4 px-3 sm:py-2 rounded-md transition duration-300`}
      >
        DELETE
      </button>
      <DeleteConfirmationModal
        show={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={() => {
          setIsDeleteModalOpen(false);
          deleteUserPost(post.id);
        }}
      />
    </section>
  );
};

UserPost.propTypes = {
  post: PropTypes.object.isRequired,
};

export default UserPost;
