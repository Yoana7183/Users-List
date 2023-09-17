import { useContext } from 'react';
import axios from 'axios';
import { UserListContext } from '../context/UserListContextProvider';
/**
 * Custom React hook for managing API requests related to user posts.
 * @returns {object} An object containing functions for fetching, updating, and deleting user posts.
 */
const useManageUserPostAPI_request = () => {
  const { setUserPosts, userPosts, setError, setLoading } =
    useContext(UserListContext);
  /**
   * Fetches user posts by user ID from a remote API and updates the user posts context.
   * @param {number} userId - The ID of the user for whom to fetch posts.
   */
  const getUserPostById = (userId) => {
    setError(false);
    setLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => {
        setUserPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };
  /**
   * Deletes a user post by post ID from a remote API and updates the user posts context.
   * @param {number} postId - The ID of the post to delete.
   */
  const deleteUserPost = (postId) => {
    setError(false);
    setLoading(true);
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(() => {
        const updatedPosts = userPosts.filter((post) => post.id !== postId);
        setUserPosts(updatedPosts);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };
  /**
   * Updates a user post by post ID with new post data on the remote API and updates the user posts context.
   * @param {number} postId - The ID of the post to update.
   * @param {object} updatedPostData - The new post data to set.
   */
  const updateUserPost = (postId, updatedPostData) => {
    setError(false);
    setLoading(true);
    if (!/^[1-9]\d*$/.test(postId)) {
      setError(true);
      setLoading(false);
      return;
    }
    axios
      .put(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        updatedPostData
      )
      .then((response) => {
        const updatedPosts = userPosts.map((post) =>
          post.id === postId ? { ...post, ...response.data } : post
        );
        setUserPosts(updatedPosts);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };
  return { getUserPostById, deleteUserPost, updateUserPost };
};

export default useManageUserPostAPI_request;
