import { useEffect } from 'react';
import PropTypes from 'prop-types';
/**
 * ValidateUserListInputs component handles input validation for user data fields.
 *
 * This component receives the `type`, `value`, and `setValidationErrors` props to
 * determine the type of validation to perform and update validation errors accordingly.
 * It checks for various validation conditions for different types of user data fields
 * such as username, email, street, suite, and city.
 *
 * @component
 * @param {string} props.type - The type of input field to validate (e.g., 'username', 'email').
 * @param {string} props.value - The current value of the input field.
 * @param {function} props.setValidationErrors - A function to set validation errors based on the type.
 * @returns {null} This component does not render any visible UI elements.
 */
const ValidateUserListInputs = ({ type, value, setValidationErrors }) => {
  useEffect(() => {
    // Regular expression to allow letters, "@" and ".", but not just spaces or "@"/"."
    // eslint-disable-next-line no-useless-escape
    const inputPattern = /^(?=.*[a-zA-Z])[a-zA-Z0-9\s@.]*[a-zA-Z0-9@.]$/;

    switch (type) {
      case 'username':
        if (value.length === 0) {
          setValidationErrors((prevState) => ({
            ...prevState,
            username: 'Username is required',
          }));
        } else if (!inputPattern.test(value)) {
          setValidationErrors((prevState) => ({
            ...prevState,
            username: 'Invalid characters in username',
          }));
        } else {
          setValidationErrors((prevState) => ({
            ...prevState,
            username: '',
          }));
        }
        break;
      case 'email':
        if (!value) {
          setValidationErrors((prevState) => ({
            ...prevState,
            email: 'Email is required',
          }));
        } else if (!inputPattern.test(value)) {
          setValidationErrors((prevState) => ({
            ...prevState,
            username: 'Invalid characters in email',
          }));
        } else if (!value.includes('@')) {
          setValidationErrors((prevState) => ({
            ...prevState,
            email: 'Please enter a valid email address `@`',
          }));
        } else {
          setValidationErrors((prevState) => ({
            ...prevState,
            email: '',
          }));
        }
        break;

      case 'street':
        if (value.street.length === 0) {
          setValidationErrors((prevState) => ({
            ...prevState,
            street: 'Street is required',
          }));
        } else if (!inputPattern.test(value.street)) {
          setValidationErrors((prevState) => ({
            ...prevState,
            street: 'Invalid characters in street!',
          }));
        } else {
          setValidationErrors((prevState) => ({
            ...prevState,
            street: '',
          }));
        }
        break;

      case 'suite':
        if (value.suite.length === 2) {
          setValidationErrors((prevState) => ({
            ...prevState,
            suite: 'Suite is required',
          }));
        } else if (!inputPattern.test(value.suite)) {
          setValidationErrors((prevState) => ({
            ...prevState,
            suite: 'Invalid characters in suite!',
          }));
        } else if (!/\d/.test(value.suite)) {
          setValidationErrors((prevState) => ({
            ...prevState,
            suite: 'Please indicate / write the suite number',
          }));
        } else {
          setValidationErrors((prevState) => ({
            ...prevState,
            suite: '',
          }));
        }
        break;

      case 'city':
        if (value.city.length === 0) {
          setValidationErrors((prevState) => ({
            ...prevState,
            city: 'City is required',
          }));
        } else if (!inputPattern.test(value.city)) {
          setValidationErrors((prevState) => ({
            ...prevState,
            city: 'Invalid characters in city!',
          }));
        } else {
          setValidationErrors((prevState) => ({
            ...prevState,
            city: '',
          }));
        }
        break;

      default:
        setValidationErrors({});
        break;
    }
  }, [type, value, setValidationErrors]);

  return null;
};

ValidateUserListInputs.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
  setValidationErrors: PropTypes.func.isRequired,
};

export default ValidateUserListInputs;
