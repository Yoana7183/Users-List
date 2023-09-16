import { useContext } from 'react';
import axios from 'axios';

import { UserListContext } from '../context/UserListContextProvider';
const useManageUserPostAPI_request = () => {
  const { setUserPosts, userPosts, setError, setLoading } =
    useContext(UserListContext);

  const getUserPostById = (userId) => {
    setError(false);
    setLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => {
        setLoading(false);
        setUserPosts(response.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };
  const deleteUserPost = (postId) => {
    setError(false);
    setLoading(true);
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(() => {
        setLoading(false);
        const updatedPosts = userPosts.filter((post) => post.id !== postId);
        setUserPosts(updatedPosts);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };
  const updateUserPost = (postId, updatedPostData) => {
    setError(false);
    setLoading(true);
    axios
      .put(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        updatedPostData
      )
      .then((response) => {
        setLoading(false);
        const updatedPosts = userPosts.map((post) =>
          post.id === postId ? { ...post, ...response.data } : post
        );
        setUserPosts(updatedPosts);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };
  return { getUserPostById, deleteUserPost, updateUserPost };
};

export default useManageUserPostAPI_request;
